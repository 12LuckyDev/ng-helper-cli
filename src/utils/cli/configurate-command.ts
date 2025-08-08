import { Command } from 'commander';

import { getConfig } from './get-config';

export const configurateCommand = (command: Command): void => {
  const config = getConfig();
  if (!config) {
    return;
  }

  const { name, version, description } = config;

  if (name) {
    command.name(name);
  }
  if (version) {
    command.version(version, '-v --version', 'Output the version number');
  }
  if (description) {
    command.description(description);
  }
};
