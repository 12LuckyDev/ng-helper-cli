import { Logger } from './logger';
import { runCommnad } from './run-command';

export const npmInstall = async (
  workingDir: string,
  packageName: string,
  logger: Logger,
  { dev, legacyPeerDeps }: { dev?: boolean; legacyPeerDeps?: boolean } = {},
): Promise<boolean> => {
  const command = `npm i${dev ? ' -D' : ''}${legacyPeerDeps ? ' --legacy-peer-deps' : ''} ${packageName}`;
  const result = await runCommnad(workingDir, command, `${packageName} installed !!!`, logger);
  return result;
};

export class NpmInstaller {
  constructor(
    private _workingDir: string,
    private _logger: Logger,
    private _opt: {
      dev?: boolean;
      legacyPeerDeps?: boolean;
    } = {},
  ) {}

  public async run(packageName: string): Promise<boolean> {
    return npmInstall(this._workingDir, packageName, this._logger, this._opt);
  }
}
