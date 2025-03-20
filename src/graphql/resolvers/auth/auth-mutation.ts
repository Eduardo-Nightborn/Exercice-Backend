import { AppContext } from '../../../libs/context';
import { AuthTokensEntity } from '../../../entities/auth/auth-tokens';
import { Usecases } from '../../../usecases';
import {
  MutationImpersonateUserArgs,
  MutationRefreshTokenArgs,
  MutationResolvers,
  MutationSignInArgs,
  MutationStopImpersonatingUserArgs,
} from '../../__generated__/resolvers-types';

export const initAuthMutationResolvers = (
  usecases: Usecases,
): Pick<
  MutationResolvers,
  'signIn' | 'refreshToken' | 'impersonateUser' | 'stopImpersonatingUser'
> => {
  {
    return {
      signIn: async (
        _,
        args: MutationSignInArgs,
        context: AppContext,
      ): Promise<AuthTokensEntity> => {
        return usecases.auth.signIn(context, {
          email: args.input.email,
          password: args.input.password,
        });
      },
      refreshToken: async (
        _,
        args: MutationRefreshTokenArgs,
        context: AppContext,
      ): Promise<AuthTokensEntity> => {
        return usecases.auth.refreshToken(context, {
          refreshToken: args.input.refreshToken,
        });
      },
      impersonateUser: async (
        _,
        args: MutationImpersonateUserArgs,
        context: AppContext,
      ): Promise<AuthTokensEntity> => {
        return usecases.auth.impersonateUser(context, {
          userId: args.input.userId,
          refreshToken: args.input.refreshToken,
        });
      },
      stopImpersonatingUser: async (
        _,
        args: MutationStopImpersonatingUserArgs,
        context: AppContext,
      ): Promise<AuthTokensEntity> => {
        return usecases.auth.stopImpersonatingUser(context, {
          refreshToken: args.input.refreshToken,
        });
      },
    };
  }
};
