import { promisify } from 'util';
import { exec } from 'child_process';
import pc from 'picocolors';

const execAsync = promisify(exec);

export const runCommnad = async (
  workingDir: string,
  command: string,
  { verbose, successMsg }: { verbose?: boolean; successMsg?: string } = {},
): Promise<boolean> => {
  try {
    if (verbose) {
      console.info(pc.cyan(`Running command: "${command}"`));
    }

    const { stdout, stderr } = await execAsync(command, {
      cwd: workingDir,
    });

    if (stdout) {
      if (verbose) {
        console.info(pc.blue(stdout));
      }
      if (successMsg) {
        console.info(pc.greenBright(successMsg));
      }
      return true;
    }

    console.error(pc.red(stderr));
    return false;
  } catch (ex) {
    console.error(pc.red(JSON.stringify(ex)));
    return false;
  }
};
