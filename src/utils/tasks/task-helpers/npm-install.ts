import { promisify } from "util";
import { exec } from "child_process";
import pc from "picocolors";

const execAsync = promisify(exec);

export const npmInstall = async (
  workingDir: string,
  packageName: string,
  { dev }: { dev?: boolean } = {},
): Promise<boolean> => {
  try {
    const command = `npm i${dev ? " -D" : ""} ${packageName}`;
    console.info(pc.cyan(`Running command: "${command}"`));

    const { stdout, stderr } = await execAsync(command, {
      cwd: workingDir,
    });

    if (stdout) {
      console.info(pc.blue(stdout));
      console.info(pc.greenBright(`${packageName} installed !!!`));
      return true;
    }

    console.error(pc.red(stderr));
    return false;
  } catch (ex) {
    console.error(pc.red(JSON.stringify(ex)));
    return false;
  }
};
