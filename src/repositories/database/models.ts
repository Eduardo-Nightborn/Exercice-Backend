import type { ColumnType } from 'kysely';

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Users {
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
  email: string;
  external_id: string;
  first_name: string;
  id: string;
  is_admin: Generated<boolean>;
  last_name: string;
  updated_at: Generated<Timestamp>;
}

export interface DB {
  users: Users;
}
