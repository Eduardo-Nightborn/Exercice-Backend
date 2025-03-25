import { Usecases } from '../../../usecases';
import { Resolvers } from '../../__generated__/resolvers-types';
import { initMessageMutationResolvers } from './message-mutation';
import { initMessageResolvers } from './message';
import { initMessagesQueryResolvers } from './message-query';

export const initMessageModuleResolvers = (usecases: Usecases): Resolvers => {
  return {
    Query: {
      ...initMessagesQueryResolvers(usecases),
    },
    Mutation: {
      ...initMessageMutationResolvers(usecases),
    },
    Message: initMessageResolvers(usecases),
  };
};
