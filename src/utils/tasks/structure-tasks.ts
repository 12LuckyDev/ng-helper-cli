import path from 'path';
import { HelperRunnerOptions } from '../../models';
import { DirCreator } from '../../runners/create-dir';
import { DEFAULT_CORE_STRUCTURE } from './structure-consts';

export const structureTasks = async ({
  structure,
  indexify,
  devInstaller,
  scriptAdder,
  workingDir,
  verbose,
  structureDirs,
}: HelperRunnerOptions): Promise<boolean> => {
  let result = true;

  if (!structure) {
    return result;
  }

  if (indexify) {
    result = await devInstaller.run('indexify-dir-cli');
  }

  const creator = new DirCreator(path.join(workingDir, 'src/core'), {
    verbose,
  });

  for (const dir of [...DEFAULT_CORE_STRUCTURE, ...structureDirs]) {
    result = await creator.run(dir);
    if (indexify) {
      result = await scriptAdder.run(`indexify:${dir}`, `indexify-dir-cli ts ./src/core/${dir} -s -b -n -i`);
    }
  }

  return result;
};
