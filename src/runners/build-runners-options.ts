import { HelperActionOptions, HelperRunnerOptions } from '../models';
import { getWorkingPath } from '../utils';
import { NpmScriptAdder } from './add-npm-script';
import { Logger } from './logger';
import { NpmInstaller } from './npm-install';
import { CommandRunner } from './run-command';
import { ProjectFileWritter } from './write-project-file';

export const buildRunnerOptions = (path: string | null, options: HelperActionOptions): HelperRunnerOptions => {
  const workingDir = getWorkingPath(path);
  const logger = new Logger(options);
  return {
    workingDir,
    ...options,
    logger,
    commandRunner: new CommandRunner(workingDir, logger),
    scriptAdder: new NpmScriptAdder(workingDir, logger),
    fileWritter: new ProjectFileWritter(workingDir, logger),
    devInstaller: new NpmInstaller(workingDir, logger, {
      dev: true,
      legacyPeerDeps: options.legacyPeerDeps,
    }),
  };
};
