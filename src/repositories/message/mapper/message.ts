import { Selectable } from 'kysely';
import { Messages } from '../../database/models';
import { MessageEntity } from '../../../entities/message/message';

export const toMessageEntity = (model: Selectable<Messages>): MessageEntity => {
  return {
    id: model.id,
    sessionId: '1',
    source: model.source_message as string,
    message: model.message,
    sentAt: model.sent_at,
  };
};

export const toUserEntities = (
  models: Selectable<Messages>[],
): MessageEntity[] => {
  return models.map(toMessageEntity);
};
