import { promises as fs } from 'fs';
import path from 'path';
import pc from 'picocolors';

export const createDir = async (
  workingDir: string,
  dirName: string,
  { verbose }: { verbose?: boolean } = {},
): Promise<boolean> => {
  try {
    if (verbose) {
      console.info(pc.cyan(`Create dir "${dirName}"`));
    }

    const dirPath = path.join(workingDir, dirName);
    await fs.mkdir(dirPath, { recursive: true });

    console.info(pc.greenBright(`Dir "${dirName}" created !!!`));
    return true;
  } catch (ex) {
    console.error(pc.red(JSON.stringify(ex)));
    return false;
  }
};

export class DirCreator {
  constructor(
    private _workingDir: string,
    private _opt: {
      verbose?: boolean;
    } = {},
  ) {}

  public run(dirName: string): Promise<boolean> {
    return createDir(this._workingDir, dirName, this._opt);
  }
}
