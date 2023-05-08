import TSVFileReader from '../file-reader/tsv-file-reader.js';
import { CliCommandInterface } from './cli-comand.interface';
import { createOffer, getErrorMessage } from '../helpers/index.js';
import { getCliTextColor } from '../helpers/cliColors.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  private onLine(line: string) {
    const offer = createOffer(line);
    console.log(offer);
  }

  private onComplete(count: number) {
    console.log(getCliTextColor.success(`${new Intl.NumberFormat('ru-RU').format(count)} элементов импортировано.`));
  }

  public async execute(filename: string): Promise<void> {
    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);
    try {
      await fileReader.read();
    } catch (err) {
      console.log(getCliTextColor.error(`Не удалось прочитать файл: ${getErrorMessage(err)}`));
    }
  }
}
