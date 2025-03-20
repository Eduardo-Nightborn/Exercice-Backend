import { Router } from 'express';
import { initAuthControllers } from './controllers';
import { Usecases } from '../../usecases';

export const initAuthRoutes = (usecases: Usecases) => {
  const controllers = initAuthControllers(usecases);

  const router = Router();

  router.post('/sign-in', controllers.signIn);
  router.get('/me', controllers.getMe);

  return router;
};
