import { Kysely } from 'kysely';
import { Usecases, initUsecases } from '../../../usecases';
import { DB } from '../../../repositories/database/models';
import { AppContext, AuthContext } from '../../context';
import { initGatewaysMock } from '../../../gateways/mocks';
import { initRepositories } from '../../../repositories';
import { Config } from '../../config';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { initDatabase } from '../../../repositories/database/database';
import { migrate } from '../../../repositories/database/migrate';

export const setup = async (): Promise<{
  config: Config;
  db: Kysely<DB>;
  usecases: Usecases;
  context: (auth: AuthContext) => AppContext;
  onStop: () => Promise<void>;
}> => {
  console.log('🚀 Starting test container...');
  const container = await new PostgreSqlContainer().start();

  const config: Config = {
    env: 'test',
    database: {
      url: container.getConnectionUri(),
    },
  } as Config;

  console.log('🗄 Initialising database...');
  const db = initDatabase(config);

  console.log('🛠️ Applying migrations...');
  await migrate(config, 'up');

  return {
    config,
    db,
    usecases: initUsecases(),
    context: (auth: AuthContext) => setupContext(auth, config, db),
    onStop: async () => {
      console.log('🛑 Stopping test container...');
      await db.destroy();
      await container.stop();
    },
  };
};

export type Setup = Awaited<ReturnType<typeof setup>>;

function setupContext(
  auth: AuthContext,
  config: Config,
  db: Kysely<DB>,
): AppContext {
  return {
    config,
    gateways: initGatewaysMock(),
    repositories: initRepositories(db),
    logger: console as any,
    auth,
  };
}
