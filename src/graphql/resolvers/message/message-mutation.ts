import { AppContext } from '../../../libs/context';
import { Usecases } from '../../../usecases';
import {
  MutationResolvers,
  MutationCreateMessageArgs,
} from '../../__generated__/resolvers-types';
import { MessageEntity } from '../../../entities/message/message';
import { BadUserInputError } from '../../../entities/errors/bad-user-input-error';

export const initMessageMutationResolvers = (
  usecases: Usecases,
): Pick<MutationResolvers, 'createMessage'> => {
  return {
    createMessage: async (
      _: any,
      args: MutationCreateMessageArgs,
      context: AppContext,
    ): Promise<MessageEntity> => {
      const { userMessage } = args;

      if (!userMessage || userMessage.trim() === '') {
        throw new BadUserInputError(
          'User message cannot be empty or just whitespace.',
        );
      }

      try {
        const result = await usecases.message.createMessage(context, {
          userMessage,
        });

        if (!result) {
          throw new Error('Failed to create message.');
        }

        return result;
      } catch (error) {
        throw new Error('Error occurred while creating message: ' + error);
      }
    },
  };
};
