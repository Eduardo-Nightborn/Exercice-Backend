import { initUserRepositories } from './user';
import { DB } from './database/models';
import { Kysely } from 'kysely';
import { initMessageRepositories } from './message';

export const initRepositories = (db: Kysely<DB>) => {
  return {
    user: initUserRepositories(db),
    message: initMessageRepositories(db),
  };
};

export type Repositories = ReturnType<typeof initRepositories>;
