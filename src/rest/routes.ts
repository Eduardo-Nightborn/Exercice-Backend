import { Router } from 'express';
import { initAuthRoutes } from './auth/routes';
import { Usecases } from '../usecases';
import { initUserRoutes } from './user/routes';

export const initRoutes = (app: Router, usecases: Usecases) => {
  const userRouter = initUserRoutes(usecases);
  app.use('/users', userRouter);

  const authRouter = initAuthRoutes(usecases);
  app.use('/auth', authRouter);
};
