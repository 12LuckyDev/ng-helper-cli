import { HelperRunnerOptions } from '../../models';
import { PRETTIERIGNORE_CONTENT, PRETTIERRC_CONTENT } from './prettier-consts';

export const prettierTasks = async ({
  prettier,
  prettierScript,
  prettierFormat,
  commandRunner,
  devInstaller,
  fileWritter,
  scriptAdder,
}: HelperRunnerOptions): Promise<boolean> => {
  let result = true;

  if (!prettier) {
    return result;
  }

  result = await devInstaller.run('prettier');

  result = await fileWritter.run('.prettierrc', PRETTIERRC_CONTENT);
  result = await fileWritter.run('.prettierignore', PRETTIERIGNORE_CONTENT);

  if (prettierScript) {
    result = await scriptAdder.run('format', 'prettier . --write');
  }

  if (prettierFormat) {
    result = await commandRunner.run(
      prettierScript ? 'npm run format' : 'npx prettier . --write',
      `Prettier was run on the entire project !!!`,
    );
  }

  return result;
};
