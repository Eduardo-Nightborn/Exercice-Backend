import { Usecases } from '../../usecases';
import { Resolvers } from '../__generated__/resolvers-types';
import { initAuthModuleResolvers } from './auth';
import { initMessageModuleResolvers } from './message';
import { initScalars } from './scalars';
import { initUserModuleResolvers } from './user';

export const initResolvers = (usecases: Usecases): Resolvers => {
  const {
    Query: userQueries,
    Mutation: userMutations,
    ...userResolvers
  } = initUserModuleResolvers(usecases);

  const {
    Query: authQueries,
    Mutation: authMutations,
    ...authResolvers
  } = initAuthModuleResolvers(usecases);

  const {
    Query: messageQueries,
    Mutation: messageMutations,
    ...messageResolvers
  } = initMessageModuleResolvers(usecases);

  return {
    ...initScalars(),
    Query: {
      ...userQueries,
      ...authQueries,
      ...messageQueries,
    },
    Mutation: {
      ...userMutations,
      ...authMutations,
      ...messageMutations,
    },
    ...userResolvers,
    ...authResolvers,
    ...messageResolvers,
  };
};
