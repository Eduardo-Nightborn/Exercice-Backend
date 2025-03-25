import { Kysely } from 'kysely';
import { DB } from '../database/models';
import { v4 as uuidv4 } from 'uuid';
import { UnknownError } from '../../entities/errors/unknown-error';
import { toMessageEntity } from './mapper/message';
import { MessageEntity } from '../../entities/message/message';

export function initCreateMessageRepository(db: Kysely<DB>) {
  return async (
    id: string,
    sessionId: string,
    source: string,
    message: string,
    sentAt: Date,
  ): Promise<MessageEntity> => {
    try {
      const sentMessage = await db
        .insertInto('messages')
        .values({
          id: id,
          sessionId: sessionId,
          source_message: source,
          message: message,
          sent_at: sentAt,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      if (!sentMessage || Object.keys(sentMessage).length === 0) {
        throw new UnknownError('Message creation failed, no data returned.');
      }

      return toMessageEntity(sentMessage);
    } catch (err: any) {
      throw new UnknownError(err.message);
    }
  };
}
