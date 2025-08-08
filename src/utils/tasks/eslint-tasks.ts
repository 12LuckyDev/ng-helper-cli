import { HelperActionOptions } from "../../models";
import { addNpmScript } from "./task-helpers/add-npm-script";
import { NpmInstaller } from "./task-helpers/npm-install";
import { ProjectFileWritter } from "./task-helpers/write-project-file";
import {
  ESLINTCONFIG_CONTENT,
  ESLINTCONFIG_WITH_PRETTIER_CONTENT,
} from "./eslint-consts";

export const eslintTasks = async (
  workingDir: string,
  { prettier, legacyPeerDeps, verbose }: HelperActionOptions,
): Promise<boolean> => {
  let result = true;
  const installer = new NpmInstaller(workingDir, {
    dev: true,
    legacyPeerDeps,
    verbose,
  });

  result = await installer.run("eslint");
  result = await installer.run("@eslint/js");
  result = await installer.run("typescript-eslint");
  if (prettier) {
    result = await installer.run("eslint-config-prettier");
  }

  const writter = new ProjectFileWritter(workingDir, { verbose });

  result = await writter.run(
    "eslint.config.mjs",
    prettier ? ESLINTCONFIG_WITH_PRETTIER_CONTENT : ESLINTCONFIG_CONTENT,
  );

  result = await addNpmScript(workingDir, "lint", "eslint");

  return result;
};
