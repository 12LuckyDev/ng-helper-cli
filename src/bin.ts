#!/usr/bin/env node

import { Command } from "commander";
import { configurateCommand, getWorkingPath, prettierTasks } from "./utils";

const program: Command = new Command();
configurateCommand(program);

program.action(async () => {
  const path = getWorkingPath("D:/Sources/ng-helper/helper-playground");

  await prettierTasks(path);
});

program.parse(process.argv);
