import { AuthTokensEntity } from '../../../entities/auth/auth-tokens';
import { AuthTokensDTO } from '../dtos/auth-tokens';

export const toAuthTokensDTO = (tokens: AuthTokensEntity): AuthTokensDTO => {
  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    expiredAt: tokens.expiredAt,
  };
};
