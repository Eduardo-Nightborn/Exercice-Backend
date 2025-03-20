import { Router } from 'express';
import { initUserControllers } from './controllers';
import { Usecases } from '../../usecases';

export const initUserRoutes = (usecases: Usecases) => {
  const controllers = initUserControllers(usecases);

  const router = Router();

  router.get('/', controllers.getAll);
  router.get('/:id', controllers.getById);
  router.post('/', controllers.create);

  return router;
};
