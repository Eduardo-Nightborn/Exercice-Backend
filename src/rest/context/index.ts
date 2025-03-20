import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AppContext, AuthContext } from '../../libs/context';
import Logger from 'bunyan';
import { Config } from '../../libs/config';
import { Kysely } from 'kysely';
import { DB } from '../../repositories/database/models';
import { initRepositories } from '../../repositories';
import { Gateways } from '../../gateways';

export const contextMiddleware =
  (
    config: Config,
    db: Kysely<DB>,
    logger: Logger,
    gateways: Gateways,
  ): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    let auth: AuthContext = {
      isAuthenticated: false,
    };
    let authHeader = req.headers.authorization;
    if (authHeader) {
      authHeader = authHeader.replace(/^bearer /gim, '');
      auth = await gateways.iam.getAuthAndValidateToken(authHeader);
    }

    const context: AppContext = {
      config,
      logger,
      repositories: initRepositories(db),
      gateways,
      auth,
    };
    req.context = context;
    next();
  };
