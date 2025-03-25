import { Kysely } from 'kysely';
import { MessageEntity } from '../../entities/message/message';
import { DB } from '../database/models';
import DataLoader from 'dataloader';
import { NotFoundError } from '../../entities/errors/not-found-error';
import { toMessageEntity } from './mapper/message';
import { UnknownError } from '../../entities/errors/unknown-error';

export function initGetMessageByIdRepository(
  db: Kysely<DB>,
  dataloaderByIds: DataLoader<string, MessageEntity | NotFoundError>,
) {
  return async (id: string): Promise<MessageEntity> => {
    const message = await dataloaderByIds.load(id);
    if (message instanceof NotFoundError) {
      throw message;
    }
    return message;
  };
}
