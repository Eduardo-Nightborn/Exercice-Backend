import { Kysely } from 'kysely';
import { UserEntity } from '../../entities/user/user';
import { DB } from '../database/models';
import DataLoader from 'dataloader';
import { NotFoundError } from '../../entities/errors/not-found-error';

export function initGetUserByIdRepository(
  db: Kysely<DB>,
  dataloaderByIds: DataLoader<string, UserEntity | NotFoundError>,
) {
  return async (id: string): Promise<UserEntity> => {
    const user = await dataloaderByIds.load(id);
    if (user instanceof NotFoundError) {
      throw user;
    }
    return user;
  };
}
