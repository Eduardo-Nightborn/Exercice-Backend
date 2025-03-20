import { signIn } from './sign-in';
import { getMe } from './get-me';
import { refreshToken } from './refresh-token';
import { impersonateUser } from './impersonate-user';
import { stopImpersonatingUser } from './stop-impersonating-user';

export const initAuthUsecases = () => {
  return {
    signIn,
    refreshToken,
    impersonateUser,
    stopImpersonatingUser,
    getMe,
  };
};

export type UserUsecases = ReturnType<typeof initAuthUsecases>;
