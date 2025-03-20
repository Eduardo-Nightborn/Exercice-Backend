import { Kysely } from 'kysely';
import DataLoader from 'dataloader';
import { DB } from '../database/models';
import { initGetUserByEmailRepository } from './get-user-by-email';
import { initCreateUserRepository } from './create-user';
import { initGetUserByIdRepository } from './get-user-by-id';
import { initGetUserByExternalIdRepository } from './get-user-by-external-id';
import { initGetAllUsersRepository } from './get-all-users';
import { initGetUsersByIdsRepository } from './get-users-by-ids';

export const initUserRepositories = (db: Kysely<DB>) => {
  const dataloaderByIds = new DataLoader(initGetUsersByIdsRepository(db));

  return {
    getById: initGetUserByIdRepository(db, dataloaderByIds),
    getByEmail: initGetUserByEmailRepository(db),
    getByExternalId: initGetUserByExternalIdRepository(db),
    getAll: initGetAllUsersRepository(db),
    create: initCreateUserRepository(db),
  };
};

export type userRepositories = ReturnType<typeof initUserRepositories>;
