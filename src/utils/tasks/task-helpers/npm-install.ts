import { promisify } from "util";
import { exec } from "child_process";
import pc from "picocolors";

const execAsync = promisify(exec);

export const npmInstall = async (
  workingDir: string,
  packageName: string,
  {
    dev,
    legacyPeerDeps,
    verbose,
  }: { dev?: boolean; legacyPeerDeps?: boolean; verbose?: boolean } = {},
): Promise<boolean> => {
  try {
    const command = `npm i${dev ? " -D" : ""}${legacyPeerDeps ? " --legacy-peer-deps" : ""} ${packageName}`;
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
