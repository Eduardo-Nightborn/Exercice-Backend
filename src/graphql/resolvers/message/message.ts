import { MessageEntity } from '../../../entities/message/message';
import { Usecases } from '../../../usecases';
import { MessageResolvers } from '../../__generated__/resolvers-types';

export const initMessageResolvers = (usecases: Usecases): MessageResolvers => ({
  id: {
    resolve: (parent: MessageEntity) => {
      return parent.id;
    },
  },
  sessionId: {
    resolve: (parent: { sessionId: string }) => {
      return parent.sessionId || null;
    },
  },
  source: {
    resolve: (parent: { source: string }) => {
      if (!parent.source) {
        throw new Error('source cannot be null');
      }
      return parent.source;
    },
  },
  message: {
    resolve: (parent: { message: string }) => {
      if (!parent.message) {
        throw new Error('message cannot be null');
      }
      return parent.message;
    },
  },
  sentAt: {
    resolve: (parent: { sentAt: Date }) => {
      if (!parent.sentAt) {
        throw new Error('sentAt cannot be null');
      }
      return parent.sentAt;
    },
  },
});
