import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('users')
    .addColumn('id', 'uuid', (col) => col.primaryKey().notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('deleted_at', 'timestamp')
    .addColumn('email', 'varchar(255)', (col) => col.notNull())
    .addColumn('first_name', 'varchar(255)', (col) => col.notNull())
    .addColumn('last_name', 'varchar(255)', (col) => col.notNull())
    .addColumn('external_id', 'varchar(255)', (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('users').execute();
}
