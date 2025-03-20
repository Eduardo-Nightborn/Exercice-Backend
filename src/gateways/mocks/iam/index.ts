import { faker } from '@faker-js/faker';
import { IAMGateway } from '../../iam';

export const initIAMGatewayMock = (): IAMGateway => {
  return {
    createUser: jest.fn().mockResolvedValue(faker.string.uuid()),
    getAuthAndValidateToken: jest.fn(),
    impersonateUser: jest.fn(),
    stopImpersonatingUser: jest.fn(),
    refreshToken: jest.fn(),
    signIn: jest.fn(),
  };
};
