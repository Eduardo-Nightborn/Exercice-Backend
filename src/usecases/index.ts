import { initAuthUsecases } from './auth';
import { initMessageUsecases } from './message';
import { initUserUsecases } from './user';

export const initUsecases = () => {
  return {
    user: initUserUsecases(),
    auth: initAuthUsecases(),
    message: initMessageUsecases(),
  };
};

export type Usecases = ReturnType<typeof initUsecases>;
