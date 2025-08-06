import { PRETTIERIGNORE_CONTENT, PRETTIERRC_CONTENT } from "./prettier-consts";
import { npmInstall } from "./task-helpers/npm-install";
import { writeProjectFile } from "./task-helpers/write-file";

export const prettierTasks = async (workingDir: string): Promise<boolean> => {
  let result = true;
  result = await npmInstall(workingDir, "prettier", { dev: true });

  result = await writeProjectFile(
    workingDir,
    ".prettierrc",
    PRETTIERRC_CONTENT,
  );

  result = await writeProjectFile(
    workingDir,
    ".prettierignore",
    PRETTIERIGNORE_CONTENT,
  );

  return result;
};
