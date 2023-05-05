#!/usr/bin/env node

import CLIApplication from './cli.js';
import HelpCommand from './core/cli-command/helper.command.js';
import VersionCommand from './core/cli-command/version.command.js';
import ImportCommand from './core/cli-command/import.command.js';

const cliManager = new CLIApplication();

cliManager.registerCommands([
  new HelpCommand,
  new VersionCommand,
  new ImportCommand,
]);

cliManager.processCommand(process.argv);
