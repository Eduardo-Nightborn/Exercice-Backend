import { Kysely } from 'kysely';
import { MessageEntity } from '../../entities/message/message';
import { DB } from '../database/models';
import { toMessageEntity } from './mapper/message';
import { UnknownError } from '../../entities/errors/unknown-error';

export function initGetAllMessagesRepository(db: Kysely<DB>) {
  return async (): Promise<MessageEntity[]> => {
    try {
      const messages = await db.selectFrom('messages').selectAll().execute();
      return messages.map(toMessageEntity);
    } catch (err: any) {
      throw new UnknownError(err.message);
    }
  };
}
