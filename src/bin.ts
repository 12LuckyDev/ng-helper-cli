#!/usr/bin/env node

import { Command } from "commander";
import {
  configurateCommand,
  getWorkingPath,
  prettierTasks,
  eslintTasks,
} from "./utils";

const program: Command = new Command();
configurateCommand(program);

program.action(async () => {
  // TEMPORARY -> get path from argument
  const path = getWorkingPath("D:/Sources/ng-helper/helper-playground");

  await prettierTasks(path);
  await eslintTasks(path);
  // TODO structure tasks ?
  // TODO indexify tasks
});

program.parse(process.argv);
