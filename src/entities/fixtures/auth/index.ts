import { WithRequired } from '../../../libs/types';
import { faker } from '@faker-js/faker';
import { AuthTokensEntity } from '../../auth/auth-tokens';
import { ImpersonateUserInput } from '../../auth/impersonate-user-input';
import { MeEntity } from '../../auth/me';
import { RefreshTokenInput } from '../../auth/refresh-token-input';
import { SignInInput } from '../../auth/sign-in-input';
import { StopImpersonatingUserInput } from '../../auth/stop-impersonating-user-input';

export const authFixtures = {
  authTokens: (tokens?: Partial<AuthTokensEntity>): AuthTokensEntity => {
    return {
      accessToken: faker.string.uuid(),
      refreshToken: faker.string.uuid(),
      expiredAt: faker.date.future(),
      ...tokens,
    };
  },
  impersonateUserInput: (
    input: WithRequired<ImpersonateUserInput, 'userId'>,
  ): ImpersonateUserInput => {
    return {
      refreshToken: faker.string.uuid(),
      ...input,
    };
  },
  me: (user: WithRequired<MeEntity, 'id'>): MeEntity => {
    return {
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      deletedAt: null,
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      ...user,
    };
  },
  refreshTokenInput: (
    input?: Partial<RefreshTokenInput>,
  ): RefreshTokenInput => {
    return {
      refreshToken: faker.string.uuid(),
      ...input,
    };
  },
  signInInput: (input?: Partial<SignInInput>): SignInInput => {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...input,
    };
  },
  stopImpersonatingUserInput: (
    input?: Partial<StopImpersonatingUserInput>,
  ): StopImpersonatingUserInput => {
    return {
      refreshToken: faker.string.uuid(),
      ...input,
    };
  },
};
