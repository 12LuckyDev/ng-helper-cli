import { promises as fs } from 'fs';
import path from 'path';
import { Logger } from './logger';

export const addNpmScript = async (
  workingDir: string,
  scriptName: string,
  scriptBody: string,
  logger: Logger,
): Promise<boolean> => {
  try {
    logger.verbose(`Adding script: "${scriptName}": "${scriptBody}" to package.json`);

    const packageJsonPath = path.join(workingDir, 'package.json');
    const packageJson = await fs.readFile(packageJsonPath, {
      encoding: 'utf-8',
    });

    const packageObj = JSON.parse(packageJson);

    if (!packageObj.scripts) {
      packageObj.scripts = {};
    }

    packageObj.scripts[scriptName] = scriptBody;

    await fs.writeFile(packageJsonPath, JSON.stringify(packageObj, null, 2));

    logger.success(`Script "${scriptName}" added !!!`);
    return true;
  } catch (ex) {
    logger.error(ex);
    return false;
  }
};

export class NpmScriptAdder {
  constructor(
    private _workingDir: string,
    private _logger: Logger,
  ) {}

  public async run(scriptName: string, scriptBody: string): Promise<boolean> {
    return addNpmScript(this._workingDir, scriptName, scriptBody, this._logger);
  }
}
