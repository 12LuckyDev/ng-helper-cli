import { runCommnad } from './run-command';

export const npmInstall = async (
  workingDir: string,
  packageName: string,
  { dev, legacyPeerDeps, verbose }: { dev?: boolean; legacyPeerDeps?: boolean; verbose?: boolean } = {},
): Promise<boolean> => {
  const command = `npm i${dev ? ' -D' : ''}${legacyPeerDeps ? ' --legacy-peer-deps' : ''} ${packageName}`;
  const result = await runCommnad(workingDir, command, `${packageName} installed !!!`, { verbose });
  return result;
};

export class NpmInstaller {
  constructor(
    private _workingDir: string,
    private _opt: {
      dev?: boolean;
      legacyPeerDeps?: boolean;
      verbose?: boolean;
    } = {},
  ) {}

  public async run(packageName: string): Promise<boolean> {
    return npmInstall(this._workingDir, packageName, this._opt);
  }
}
