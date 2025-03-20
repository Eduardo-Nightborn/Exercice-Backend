import { Usecases } from '../../../usecases';
import { initGetMeController } from './get-me';
import { initSignInController } from './sign-in';

export const initAuthControllers = (usecases: Usecases) => ({
  signIn: initSignInController(usecases),
  getMe: initGetMeController(usecases),
});

export type AuthControllers = ReturnType<typeof initAuthControllers>;
