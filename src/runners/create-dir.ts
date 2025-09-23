import { promises as fs } from 'fs';
import path from 'path';
import { Logger } from './logger';

export const createDir = async (workingDir: string, dirName: string, logger: Logger): Promise<boolean> => {
  try {
    logger.verbose(`Create dir "${dirName}"`);

    const dirPath = path.join(workingDir, dirName);
    await fs.mkdir(dirPath, { recursive: true });
    logger.success(`Dir "${dirName}" created !!!`);
    return true;
  } catch (ex) {
    logger.error(ex);
    return false;
  }
};

export class DirCreator {
  constructor(
    private _workingDir: string,
    private _logger: Logger,
  ) {}

  public run(dirName: string): Promise<boolean> {
    return createDir(this._workingDir, dirName, this._logger);
  }
}
