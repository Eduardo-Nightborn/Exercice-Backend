import { initUserRepositories } from './user';
import { DB } from './database/models';
import { Kysely } from 'kysely';

export const initRepositories = (db: Kysely<DB>) => {
  return {
    user: initUserRepositories(db),
  };
};

export type Repositories = ReturnType<typeof initRepositories>;
