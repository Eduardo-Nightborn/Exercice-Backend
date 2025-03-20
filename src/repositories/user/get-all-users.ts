import { Kysely } from 'kysely';
import { UserEntity } from '../../entities/user/user';
import { DB } from '../database/models';
import { toUserEntities } from './mappers/user';
import { UnknownError } from '../../entities/errors/unknown-error';

export function initGetAllUsersRepository(db: Kysely<DB>) {
  return async (): Promise<UserEntity[]> => {
    try {
      const users = await db
        .selectFrom('users')
        .selectAll()
        .where('users.deleted_at', 'is', null)
        .execute();
      return toUserEntities(users);
    } catch (err: any) {
      throw new UnknownError(err.message);
    }
  };
}
