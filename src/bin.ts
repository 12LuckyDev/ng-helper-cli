#!/usr/bin/env node

import { Command } from "commander";
import {
  configurateCommand,
  getWorkingPath,
  prettierTasks,
  eslintTasks,
} from "./utils";
import { HelperActionOptions } from "./models";

const program: Command = new Command();
configurateCommand(program);

program
  .argument("[path]", "(Optional) Path angular project root", null)
  .option("--np --no-prettier", "Cli will not add pretier to the project")
  .option("--ne --no-eslint", "Cli will not add eslint to the project")
  .option(
    "--legacy-peer-deps",
    "All npm installation will be done with --legacy-peer-deps flag",
    false,
  )
  .option("-V --verbose", "Make cli more talkative :)", false)
  .action(async (path: string | null, options: HelperActionOptions) => {
    const workingDir = getWorkingPath(path);

    if (options.prettier) {
      await prettierTasks(workingDir, options);
    }

    if (options.eslint) {
      await eslintTasks(workingDir, options);
    }

    // TODO structure tasks ?
    // TODO indexify tasks
  });

program.parse(process.argv);
