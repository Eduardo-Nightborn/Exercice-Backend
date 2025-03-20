import { Kysely } from 'kysely';
import { UserEntity } from '../../entities/user/user';
import { DB } from '../database/models';
import { toUserEntity } from './mappers/user';
import { v4 as uuidv4 } from 'uuid';
import { UnknownError } from '../../entities/errors/unknown-error';

export function initCreateUserRepository(db: Kysely<DB>) {
  return async (
    email: string,
    firstName: string,
    lastName: string,
    externalId: string,
  ): Promise<UserEntity> => {
    try {
      const createdUser = await db
        .insertInto('users')
        .values({
          id: uuidv4(),
          email,
          first_name: firstName,
          last_name: lastName,
          external_id: externalId,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
      return toUserEntity(createdUser);
    } catch (err: any) {
      throw new UnknownError(err.message);
    }
  };
}
