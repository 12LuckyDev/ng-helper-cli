import { promises as fs } from 'fs';
import path from 'path';
import { Logger } from './logger';

export const writeProjectFile = async (
  workingDir: string,
  fileName: string,
  fileContent: string,
  logger: Logger,
): Promise<boolean> => {
  try {
    logger.verbose(`Writing "${fileName}" file.`);

    await fs.writeFile(path.join(workingDir, fileName), fileContent);

    logger.success(`File "${fileName}" created !!!`);
    return true;
  } catch (ex) {
    logger.error(ex);
    return false;
  }
};

export class ProjectFileWritter {
  constructor(
    private _workingDir: string,
    private _logger: Logger,
  ) {}

  public async run(fileName: string, fileContent: string): Promise<boolean> {
    return writeProjectFile(this._workingDir, fileName, fileContent, this._logger);
  }
}
