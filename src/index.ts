import { initRest } from './rest';
import { config } from './libs/config';
import { initUsecases } from './usecases';
import { initLogger } from './libs/logger';
import express from 'express';
import http from 'http';
import { initGraphQL } from './graphql';
import { initDatabase } from './repositories/database/database';
import { initGateways } from './gateways';

const main = async () => {
  const logger = await initLogger(config);
  const db = initDatabase(config);
  const gateways = initGateways(config);
  const usecases = initUsecases();

  // Create server
  const app = express();

  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);

  // Init GraphQL API
  const graphqlRouter = await initGraphQL(
    httpServer,
    config,
    db,
    logger,
    usecases,
    gateways,
  );
  app.use('/graphql', graphqlRouter);

  // Init Rest API
  const restRouter = initRest(config, db, logger, usecases, gateways);
  app.use('/api', restRouter);

  // Start the server
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: config.port }, () => {
      logger.logger.info(`Server is running on port ${config.port}`);
      resolve();
    }),
  );
};

main();
