import express, { Router } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import http from 'http';
import { readFile } from 'fs/promises';
import path from 'path';
import { InitLogger } from '../libs/logger';
import { Usecases } from '../usecases';
import { initResolvers } from './resolvers';
import { errorFormatter } from './errors/error-formatter';
import { initRepositories } from '../repositories';
import { Kysely } from 'kysely';
import { DB } from '../repositories/database/models';
import { AppContext, AuthContext } from '../libs/context';
import { Config } from '../libs/config';
import { errorLoggingPlugin } from './errors/error-logging-plugin';
import { Gateways } from '../gateways';

export const initGraphQL = async (
  httpServer: http.Server,
  config: Config,
  db: Kysely<DB>,
  logger: InitLogger,
  usecases: Usecases,
  gateways: Gateways,
): Promise<Router> => {
  const router = Router();

  const typeDefs = await readFile(
    path.join(__dirname, '/schema.graphql'),
    'utf8',
  );

  const server = new ApolloServer<AppContext>({
    nodeEnv: config.graphql.sandbox ? 'development' : config.env,
    typeDefs,
    resolvers: initResolvers(usecases),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      errorLoggingPlugin(logger.logger),
    ],
    formatError: errorFormatter,
  });

  await server.start();

  // Middlewares
  router.use(
    cors<cors.CorsRequest>({
      methods: ['GET', 'POST', 'OPTIONS'],
      origin: config.cors.origin,
    }),
    express.json(),
    logger.middleware,
    expressMiddleware(server, {
      context: async ({ req, res }): Promise<AppContext> => {
        const { operationName } = req.body;
        let auth: AuthContext = {
          isAuthenticated: false,
        };
        let authHeader = req.headers.authorization;
        if (authHeader && operationName !== 'IntrospectionQuery') {
          authHeader = authHeader.replace(/^bearer /gim, '');
          auth = await gateways.iam.getAuthAndValidateToken(authHeader);
        }

        return {
          config,
          logger: logger.logger,
          repositories: initRepositories(db),
          gateways,
          auth,
        };
      },
    }),
  );

  return router;
};
