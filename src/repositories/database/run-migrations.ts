import { config } from '../../libs/config';
import { migrate } from './migrate';

async function handleMigrationCommand() {
  const command = process.argv[2];

  if (command !== 'up' && command !== 'down') {
    console.error('Invalid command. Use "up" or "down".');
    process.exit(1);
  }

  await migrate(config, command);
}

handleMigrationCommand();
