import { Config } from '../libs/config';
import { initCohereGateway } from './cohere';
import { initEmailGateway } from './email';
import { initIAMGateway } from './iam';

export const initGateways = (config: Config) => {
  return {
    iam: initIAMGateway(config),
    email: initEmailGateway(config),
    cohere: initCohereGateway(config),
  };
};

export type Gateways = ReturnType<typeof initGateways>;
