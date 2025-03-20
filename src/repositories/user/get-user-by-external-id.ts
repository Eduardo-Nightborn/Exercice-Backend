import { Kysely } from 'kysely';
import { UserEntity } from '../../entities/user/user';
import { DB } from '../database/models';
import { toUserEntity } from './mappers/user';
import { NotFoundError } from '../../entities/errors/not-found-error';

export function initGetUserByExternalIdRepository(db: Kysely<DB>) {
  return async (externalId: string): Promise<UserEntity> => {
    const user = await db
      .selectFrom('users')
      .selectAll()
      .where('users.deleted_at', 'is', null)
      .where('users.external_id', '=', externalId)
      .executeTakeFirst();

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return toUserEntity(user);
  };
}
