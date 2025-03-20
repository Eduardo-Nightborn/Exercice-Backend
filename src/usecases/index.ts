import { initAuthUsecases } from './auth';
import { initUserUsecases } from './user';

export const initUsecases = () => {
  return {
    user: initUserUsecases(),
    auth: initAuthUsecases(),
  };
};

export type Usecases = ReturnType<typeof initUsecases>;
