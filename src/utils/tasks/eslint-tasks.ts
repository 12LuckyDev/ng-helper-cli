import { HelperActionOptions } from '../../models';
import { NpmScriptAdder } from './task-helpers/add-npm-script';
import { NpmInstaller } from './task-helpers/npm-install';
import { ProjectFileWritter } from './task-helpers/write-project-file';
import { ESLINTCONFIG_CONTENT, ESLINTCONFIG_WITH_PRETTIER_CONTENT } from './eslint-consts';

export const eslintTasks = async (
  workingDir: string,
  { prettier, eslint, legacyPeerDeps, verbose }: HelperActionOptions,
): Promise<boolean> => {
  let result = true;

  if (!eslint) {
    return result;
  }

  const installer = new NpmInstaller(workingDir, {
    dev: true,
    legacyPeerDeps,
    verbose,
  });

  result = await installer.run('eslint');
  result = await installer.run('@eslint/js');
  result = await installer.run('typescript-eslint');
  if (prettier) {
    result = await installer.run('eslint-config-prettier');
  }

  const writter = new ProjectFileWritter(workingDir, { verbose });

  result = await writter.run('eslint.config.mjs', prettier ? ESLINTCONFIG_WITH_PRETTIER_CONTENT : ESLINTCONFIG_CONTENT);

  const adder = new NpmScriptAdder(workingDir, { verbose });
  result = await adder.run('lint', 'eslint');

  return result;
};
