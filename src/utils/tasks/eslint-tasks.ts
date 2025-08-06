import { ESLINTCONFIG_CONTENT } from "./eslint-consts";
import { addNpmScript } from "./task-helpers/add-npm-script";
import { npmInstall } from "./task-helpers/npm-install";
import { writeProjectFile } from "./task-helpers/write-file";

export const eslintTasks = async (workingDir: string): Promise<boolean> => {
  let result = true;
  result = await npmInstall(workingDir, "eslint", { dev: true });
  result = await npmInstall(workingDir, "@eslint/js", { dev: true });
  result = await npmInstall(workingDir, "typescript-eslint", { dev: true });
  result = await npmInstall(workingDir, "eslint-config-prettier", {
    dev: true,
  });

  result = await writeProjectFile(
    workingDir,
    "eslint.config.mjs",
    ESLINTCONFIG_CONTENT,
  );

  result = await addNpmScript(workingDir, "lint", "eslint");

  return result;
};
