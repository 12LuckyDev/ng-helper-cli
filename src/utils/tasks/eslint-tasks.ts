import { HelperRunnerOptions } from '../../models';
import { ESLINTCONFIG_CONTENT, ESLINTCONFIG_WITH_PRETTIER_CONTENT } from './eslint-consts';

export const eslintTasks = async ({
  eslint,
  prettier,
  devInstaller,
  fileWritter,
  scriptAdder,
}: HelperRunnerOptions): Promise<boolean> => {
  let result = true;

  if (!eslint) {
    return result;
  }

  result = await devInstaller.run('eslint');
  result = await devInstaller.run('@eslint/js');
  result = await devInstaller.run('typescript-eslint');
  if (prettier) {
    result = await devInstaller.run('eslint-config-prettier');
  }

  result = await fileWritter.run(
    'eslint.config.mjs',
    prettier ? ESLINTCONFIG_WITH_PRETTIER_CONTENT : ESLINTCONFIG_CONTENT,
  );

  result = await scriptAdder.run('lint', 'eslint');

  return result;
};
