#!/usr/bin/env node

import { Command } from 'commander';
import { configurateCommand, prettierTasks, eslintTasks, structureTasks } from './utils';
import { HelperActionOptions } from './models';
import { buildRunnerOptions } from './runners/build-runners-options';

const program: Command = new Command();
configurateCommand(program);

program
  .argument('[path]', '(Optional) Path angular project root', null)
  .option('--np --no-prettier', 'Cli will not add pretier to the project')
  .option('--nps --no-prettier-script', 'Cli will not add a script that run prettier on the entire project')
  .option('--npf --no-prettier-format', 'Cli will not run prettier on the entire project')
  .option('--ne --no-eslint', 'Cli will not add eslint to the project')
  .option('--ns --no-structure', 'Cli will not add core directories structure')
  .option('--sd --structure-dirs <string...>', 'Additional directories to add in core directory', [])
  .option('--ni --no-indexify', 'Cli will not add indexify dependency and scripts')
  .option('--legacy-peer-deps', 'All npm installation will be done with --legacy-peer-deps flag', false)
  .option('-V --verbose', 'Make cli more talkative :)', false)
  .action(async (path: string | null, options: HelperActionOptions) => {
    const runnerOptions = buildRunnerOptions(path, options);
    await prettierTasks(runnerOptions);
    await eslintTasks(runnerOptions);
    await structureTasks(runnerOptions);

    runnerOptions.logger.success('\nAll done !!!');
  });

program.parse(process.argv);
