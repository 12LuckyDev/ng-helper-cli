import { promisify } from 'util';
import { exec } from 'child_process';
import { Logger } from './logger';

const execAsync = promisify(exec);

export const runCommnad = async (
  workingDir: string,
  command: string,
  successMsg: string,
  logger: Logger,
): Promise<boolean> => {
  try {
    logger.verbose(`Running command: "${command}"`);

    const { stdout, stderr } = await execAsync(command, {
      cwd: workingDir,
    });

    if (stdout) {
      logger.output(stdout);
      logger.success(successMsg);
      return true;
    }

    logger.error(stderr);
    return false;
  } catch (ex) {
    logger.error(ex);
    return false;
  }
};

export class CommandRunner {
  constructor(
    private _workingDir: string,
    private _logger: Logger,
  ) {}

  public async run(command: string, successMsg: string): Promise<boolean> {
    return runCommnad(this._workingDir, command, successMsg, this._logger);
  }
}
