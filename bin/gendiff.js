#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program
  .version("0.0.1", "-v, --version", "output the version number.")
  .description("Compares two configuration files and shows a difference.")
  .argument("<filepath1> <filepath2>")
  .option("-f, --format <type>", "output format")
  .helpOption("-h, --help", "output usage information");

program.parse();
