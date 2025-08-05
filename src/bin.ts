#!/usr/bin/env node

import { Command } from "commander";
import { configurateCommand } from "./utils";

const program: Command = new Command();
configurateCommand(program);

program.action(() => {});

program.parse(process.argv);
