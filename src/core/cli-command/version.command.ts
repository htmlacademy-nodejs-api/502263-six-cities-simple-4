import { readFileSync } from 'node:fs';
import path from 'node:path';

import { getCliTextColor } from '../helpers/index.js';
import { CliCommandInterface } from './cli-comand.interface';

export default class VersionCommand implements CliCommandInterface {
  public readonly name = '--version';

  private readVersion(): string {
    const contentPageJSON = readFileSync(
      path.resolve('./package.json'),
      'utf-8'
    );
    const content = JSON.parse(contentPageJSON);
    return content.version;
  }

  public async execute(): Promise<void> {
    const version = this.readVersion();
    console.log(getCliTextColor.warning(version));
  }
}
