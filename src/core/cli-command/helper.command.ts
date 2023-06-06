import { getCliTextColor } from '../helpers/index.js';
import { CliCommandInterface } from './cli-comand.interface';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
${getCliTextColor.warning('Программа для подготовки данных для REST API сервера.')}  

Пример: ${getCliTextColor.success('cli.js --<command> [--arguments]')}

Команды:

${(getCliTextColor.code('--version'))}${getCliTextColor.info('                              # выводит номер версии')}
${(getCliTextColor.code('--help'))}${getCliTextColor.info('                                 # печатает этот текст')}
${(getCliTextColor.code(`--import <mocksPath> <username>
  <userPassword> <host> 
  <dbName> <salt>`))}${getCliTextColor.info('                      # импортирует данные из TSV')}
${(getCliTextColor.code('--generate <n> <outputFilePath> <url>'))}${getCliTextColor.info('  # генерирует произвольное количество тестовых данных')}
`);
  }
}
