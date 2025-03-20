import { Kysely } from 'kysely';
import { UserEntity } from '../../entities/user/user';
import { DB } from '../database/models';
import { NotFoundError } from '../../entities/errors/not-found-error';
import { toUserEntity } from './mappers/user';
import { UnknownError } from '../../entities/errors/unknown-error';

export function initGetUsersByIdsRepository(db: Kysely<DB>) {
  return async (
    ids: readonly string[],
  ): Promise<(UserEntity | NotFoundError)[]> => {
    try {
      const users = await db
        .selectFrom('users')
        .selectAll()
        .where('users.deleted_at', 'is', null)
        .where('users.id', 'in', ids)
        .execute();

      return ids.map((id) => {
        const user = users.find((user) => user.id === id);
        if (!user) {
          return new NotFoundError('User not found');
        }
        return toUserEntity(user);
      });
    } catch (err: any) {
      throw new UnknownError(err.message);
    }
  };
}
