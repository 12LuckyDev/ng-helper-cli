import { promises as fs } from "fs";
import path from "path";
import pc from "picocolors";

export const addNpmScript = async (
  workingDir: string,
  scriptName: string,
  scriptBody: string,
  { verbose }: { verbose?: boolean } = {},
): Promise<boolean> => {
  try {
    if (verbose) {
      console.info(
        pc.cyan(
          `Adding script: "${scriptName}": "${scriptBody}" to package.json`,
        ),
      );
    }

    const packageJsonPath = path.join(workingDir, "package.json");
    const packageJson = await fs.readFile(packageJsonPath, {
      encoding: "utf-8",
    });

    const packageObj = JSON.parse(packageJson);

    if (!packageObj.scripts) {
      packageObj.scripts = {};
    }

    packageObj.scripts[scriptName] = scriptBody;

    await fs.writeFile(packageJsonPath, JSON.stringify(packageObj, null, 2));

    console.info(pc.greenBright(`Script "${scriptName}" added !!!`));
    return true;
  } catch (ex) {
    console.error(pc.red(JSON.stringify(ex)));
    return false;
  }
};

export class NpmScriptAdder {
  constructor(
    private _workingDir: string,
    private _opt: {
      verbose?: boolean;
    } = {},
  ) {}

  public async run(scriptName: string, scriptBody: string): Promise<boolean> {
    return addNpmScript(this._workingDir, scriptName, scriptBody, this._opt);
  }
}
