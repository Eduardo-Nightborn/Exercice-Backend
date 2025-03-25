import { Gateways } from '..';
import { initCohereGatewayMock } from './cohere';
import { initEmailGatewayMock } from './email';
import { initIAMGatewayMock } from './iam';

export const initGatewaysMock = (): Gateways => {
  return {
    iam: initIAMGatewayMock(),
    email: initEmailGatewayMock(),
    cohere: initCohereGatewayMock(),
  };
};
