import express, { Router } from 'express';
import 'express-async-errors';
import { InitLogger } from '../libs/logger';
import { Usecases } from '../usecases';
import { errorFormatterMiddleware } from './errors/error-formatter-middleware';
import { Config } from '../libs/config';
import { Kysely } from 'kysely';
import { DB } from '../repositories/database/models';
import { contextMiddleware } from './context';
import expressContext from 'express-request-context';
import { errorLoggingMiddleware } from './errors/error-logging-middleware';
import { Gateways } from '../gateways';
import cors from 'cors';
import { initRoutes } from './routes';

export const initRest = (
  config: Config,
  db: Kysely<DB>,
  logger: InitLogger,
  usecases: Usecases,
  gateways: Gateways,
): Router => {
  const router = Router();

  // Middlewares
  router.use(cors());
  router.use(express.json());
  router.use(expressContext());
  router.use(logger.middleware);
  router.use(contextMiddleware(config, db, logger.logger, gateways));

  // Routes
  initRoutes(router, usecases);

  router.use(errorLoggingMiddleware(logger.logger));
  router.use(errorFormatterMiddleware(config));

  return router;
};
