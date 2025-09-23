#!/usr/bin/env node

import { Command } from 'commander';
import { configurateCommand, getWorkingPath, prettierTasks, eslintTasks, structureTasks } from './utils';
import { HelperActionOptions } from './models';

const program: Command = new Command();
configurateCommand(program);

program
  .argument('[path]', '(Optional) Path angular project root', null)
  .option('--np --no-prettier', 'Cli will not add pretier to the project')
  .option('--ne --no-eslint', 'Cli will not add eslint to the project')
  .option('--ns --no-structure', 'Cli will not add core directories structure')
  .option('--sd --structure-dirs <string...>', 'Additional directories to add in core directory', [])
  .option('--ni --no-indexify', 'Cli will not add indexify dependency and scripts')
  .option('--legacy-peer-deps', 'All npm installation will be done with --legacy-peer-deps flag', false)
  .option('-V --verbose', 'Make cli more talkative :)', false)
  .action(async (path: string | null, options: HelperActionOptions) => {
    const workingDir = getWorkingPath(path);

    await prettierTasks(workingDir, options);
    await eslintTasks(workingDir, options);
    await structureTasks(workingDir, options);
  });

program.parse(process.argv);
