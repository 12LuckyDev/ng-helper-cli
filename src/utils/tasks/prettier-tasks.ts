import { HelperActionOptions } from '../../models';
import { PRETTIERIGNORE_CONTENT, PRETTIERRC_CONTENT } from './prettier-consts';
import { NpmScriptAdder } from './task-helpers/add-npm-script';
import { NpmInstaller } from './task-helpers/npm-install';
import { runCommnad } from './task-helpers/run-command';
import { ProjectFileWritter } from './task-helpers/write-project-file';

export const prettierTasks = async (
  workingDir: string,
  { prettier, prettierScript, prettierFormat, legacyPeerDeps, verbose }: HelperActionOptions,
): Promise<boolean> => {
  let result = true;

  if (!prettier) {
    return result;
  }

  const installer = new NpmInstaller(workingDir, {
    dev: true,
    legacyPeerDeps,
    verbose,
  });

  result = await installer.run('prettier');

  const writter = new ProjectFileWritter(workingDir, { verbose });

  result = await writter.run('.prettierrc', PRETTIERRC_CONTENT);
  result = await writter.run('.prettierignore', PRETTIERIGNORE_CONTENT);

  if (prettierScript) {
    const adder = new NpmScriptAdder(workingDir, { verbose });
    result = await adder.run('format', 'prettier . --write');
  }

  if (prettierFormat) {
    result = await runCommnad(workingDir, prettierScript ? 'npm run format' : 'npx prettier . --write', {
      verbose,
      successMsg: `Prettier was run on the entire project !!!`,
    });
  }

  return result;
};
