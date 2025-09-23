import { promisify } from 'util';
import { exec } from 'child_process';
import pc from 'picocolors';

const execAsync = promisify(exec);

export const runCommnad = async (
  workingDir: string,
  command: string,
  successMsg: string,
  { verbose }: { verbose?: boolean } = {},
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
      console.info(pc.greenBright(successMsg));
      return true;
    }

    console.error(pc.red(stderr));
    return false;
  } catch (ex) {
    console.error(pc.red(JSON.stringify(ex)));
    return false;
  }
};

export class CommandRunner {
  constructor(
    private _workingDir: string,
    private _opt: {
      verbose?: boolean;
    } = {},
  ) {}

  public async run(command: string, successMsg: string): Promise<boolean> {
    return runCommnad(this._workingDir, command, successMsg, this._opt);
  }
}
