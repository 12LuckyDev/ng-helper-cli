import { HelperActionOptions } from "../../models";
import { PRETTIERIGNORE_CONTENT, PRETTIERRC_CONTENT } from "./prettier-consts";
import { NpmInstaller } from "./task-helpers/npm-install";
import { ProjectFileWritter } from "./task-helpers/write-project-file";

export const prettierTasks = async (
  workingDir: string,
  { legacyPeerDeps, verbose }: HelperActionOptions,
): Promise<boolean> => {
  let result = true;

  const installer = new NpmInstaller(workingDir, {
    dev: true,
    legacyPeerDeps,
    verbose,
  });

  result = await installer.run("prettier");

  const writter = new ProjectFileWritter(workingDir, { verbose });

  result = await writter.run(".prettierrc", PRETTIERRC_CONTENT);
  result = await writter.run(".prettierignore", PRETTIERIGNORE_CONTENT);

  return result;
};
