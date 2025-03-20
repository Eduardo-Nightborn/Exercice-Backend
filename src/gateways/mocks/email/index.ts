import { EmailGateway } from '../../email';

export const initEmailGatewayMock = (): EmailGateway => {
  return {
    sendEmail: jest.fn(),
  };
};
