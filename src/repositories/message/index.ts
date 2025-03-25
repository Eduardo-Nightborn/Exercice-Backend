import { Kysely } from 'kysely';
import DataLoader from 'dataloader';
import { DB } from '../database/models';
import { initCreateMessageRepository } from './create-message';
import { initGetAllMessagesRepository } from './get-all-messages';
import { initGetMessageByIdRepository } from './get-message-by-id';
import { MessageEntity } from '../../entities/message/message';
import { NotFoundError } from '../../entities/errors/not-found-error';
import { initGetMessagesByIdsRepository } from './get-message-by-ids';

export const initMessageRepositories = (db: Kysely<DB>) => {
  const dataloaderByIds = new DataLoader(initGetMessagesByIdsRepository(db));
  return {
    createMessage: initCreateMessageRepository(db),
    getAll: initGetAllMessagesRepository(db),
    getById: initGetMessageByIdRepository(db, dataloaderByIds),
  };
};

export type messageRepositories = ReturnType<typeof initMessageRepositories>;
