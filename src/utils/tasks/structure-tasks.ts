import path from 'path';
import { HelperActionOptions } from '../../models';
import { DirCreator } from './task-helpers/create-dir';
import { DEFAULT_CORE_STRUCTURE } from './structure-consts';
import { NpmInstaller } from './task-helpers/npm-install';
import { NpmScriptAdder } from './task-helpers/add-npm-script';

export const structureTasks = async (
  workingDir: string,
  { structure, indexify, structureDirs, verbose, legacyPeerDeps }: HelperActionOptions,
): Promise<boolean> => {
  let result = true;

  if (!structure) {
    return result;
  }

  if (indexify) {
    const installer = new NpmInstaller(workingDir, {
      dev: true,
      legacyPeerDeps,
      verbose,
    });

    result = await installer.run('indexify-dir-cli');
  }

  const creator = new DirCreator(path.join(workingDir, 'src/core'), {
    verbose,
  });

  const adder = new NpmScriptAdder(workingDir, { verbose });

  for (const dir of [...DEFAULT_CORE_STRUCTURE, ...structureDirs]) {
    result = await creator.run(dir);
    if (indexify) {
      result = await adder.run(`indexify:${dir}`, `indexify-dir-cli ts ./src/core/${dir} -s -b -n -i`);
    }
  }

  return result;
};
