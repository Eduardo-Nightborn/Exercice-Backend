import { CohereGateway } from '../../cohere';

export const initCohereGatewayMock = (): CohereGateway => {
  return {
    chat: jest.fn(),
  };
};
