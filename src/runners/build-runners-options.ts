import { HelperActionOptions, HelperRunnerOptions } from '../models';
import { getWorkingPath } from '../utils';
import { NpmScriptAdder } from './add-npm-script';
import { NpmInstaller } from './npm-install';
import { CommandRunner } from './run-command';
import { ProjectFileWritter } from './write-project-file';

export const buildRunnerOptions = (path: string | null, options: HelperActionOptions): HelperRunnerOptions => {
  const workingDir = getWorkingPath(path);
  return {
    workingDir,
    ...options,
    commandRunner: new CommandRunner(workingDir),
    scriptAdder: new NpmScriptAdder(workingDir, options),
    fileWritter: new ProjectFileWritter(workingDir, options),
    devInstaller: new NpmInstaller(workingDir, {
      dev: true,
      legacyPeerDeps: options.legacyPeerDeps,
      verbose: options.verbose,
    }),
  };
};
