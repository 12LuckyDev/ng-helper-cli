import { NpmScriptAdder } from '../../runners/add-npm-script';
import { NpmInstaller } from '../../runners/npm-install';
import { CommandRunner } from '../../runners/run-command';
import { ProjectFileWritter } from '../../runners/write-project-file';
import { HelperActionOptions } from './helper-action-options.model';

export interface HelperRunnerOptions extends HelperActionOptions {
  workingDir: string;
  commandRunner: CommandRunner;
  devInstaller: NpmInstaller;
  fileWritter: ProjectFileWritter;
  scriptAdder: NpmScriptAdder;
}
