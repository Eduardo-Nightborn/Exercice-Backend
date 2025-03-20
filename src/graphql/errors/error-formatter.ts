import { unwrapResolverError } from '@apollo/server/errors';
import { BusinessError } from '../../entities/errors/business-error';
import { GraphQLFormattedError } from 'graphql';

export const errorFormatter = (
  formattedError: GraphQLFormattedError,
  error: unknown,
): GraphQLFormattedError => {
  const unwrapError = unwrapResolverError(error);
  if (unwrapError instanceof BusinessError) {
    return {
      ...formattedError,
      extensions: {
        ...formattedError.extensions,
        code: unwrapError.code,
        status: unwrapError.status,
        args: unwrapError.args,
      },
    };
  }
  return formattedError;
};
