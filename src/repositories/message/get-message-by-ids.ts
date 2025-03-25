import { Kysely } from 'kysely';
import { DB } from '../database/models';
import { NotFoundError } from '../../entities/errors/not-found-error';
import { toMessageEntity } from './mapper/message';
import { UnknownError } from '../../entities/errors/unknown-error';
import { MessageEntity } from '../../entities/message/message';

export function initGetMessagesByIdsRepository(db: Kysely<DB>) {
  return async (
    ids: readonly string[],
  ): Promise<(MessageEntity | NotFoundError)[]> => {
    try {
      const messages = await db
        .selectFrom('messages')
        .selectAll()
        .where('messages.id', 'in', ids)
        .execute();

      return ids.map((id) => {
        const user = messages.find((message) => message.id === id);
        if (!user) {
          return new NotFoundError('Message not found');
        }
        return toMessageEntity(user);
      });
    } catch (err: any) {
      throw new UnknownError(err.message);
    }
  };
}
