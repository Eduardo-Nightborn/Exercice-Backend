import { MessageEntity } from '../../../entities/message/message';
import { AppContext } from '../../../libs/context';
import { Usecases } from '../../../usecases';
import { QueryResolvers } from '../../__generated__/resolvers-types';

export const initMessagesQueryResolvers = (
  usecases: Usecases,
): Pick<QueryResolvers, 'messages' | 'message'> => {
  return {
    messages: async (
      _: any,
      __: any,
      ctx: AppContext,
    ): Promise<MessageEntity[]> => {
      return usecases.message.getAll(ctx);
    },
    message: async (
      _: any,
      args: { messageId: string },
      ctx: AppContext,
    ): Promise<MessageEntity> => {
      return usecases.message.getOne(ctx, args.messageId);
    },
  };
};
