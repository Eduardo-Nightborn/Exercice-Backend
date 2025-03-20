import * as path from 'path';
import { promises as fs } from 'fs';
import {
  Kysely,
  Migrator,
  FileMigrationProvider,
  PostgresDialect,
} from 'kysely';
import { Pool } from 'pg';
import { Config } from '../../libs/config';

export async function migrate(config: Config, command: 'up' | 'down') {
  const db = new Kysely({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: config.database.url,
      }),
    }),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.join(__dirname, '/migrations'),
    }),
  });

  const { error, results } = await (command === 'up'
    ? migrator.migrateToLatest()
    : migrator.migrateDown());

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(
        `✅ Migration "${it.migrationName}" was executed successfully`,
      );
    } else if (it.status === 'Error') {
      console.error(`❌ Failed to execute migration "${it.migrationName}"`);
    }
  });
  if (!results?.length) {
    console.log('📅 Database up-to-date: Nothing to migrate.');
  }

  if (error) {
    console.error('Failed to migrate');
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}
