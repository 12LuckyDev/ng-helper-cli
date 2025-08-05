import { promises as fs } from "fs";
import path from "path";
import pc from "picocolors";

export const writeProjectFile = async (
  workingDir: string,
  fileName: string,
  fileContent: string,
): Promise<boolean> => {
  try {
    console.info(pc.cyan(`Writing "${fileName}" file.`));

    await fs.writeFile(path.join(workingDir, fileName), fileContent);

    console.info(pc.greenBright(`File "${fileName}" created !!!`));
    return true;
  } catch (ex) {
    console.error(pc.red(JSON.stringify(ex)));
    return false;
  }
};
