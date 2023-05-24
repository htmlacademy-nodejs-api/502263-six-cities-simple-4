import { LoggerInterface } from './logger.interface.js';
import { getCliTextColor } from '../helpers/cliColors.js';

export default class ConsoleLoggerService implements LoggerInterface {
  public debug(message: string, ...args: unknown[]): void {
    console.debug(getCliTextColor.code(message), ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    console.info(getCliTextColor.text(message), ...args);
  }

  public error(message: string, ...args: unknown[]): void {
    console.error(getCliTextColor.error(message), ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    console.warn(getCliTextColor.warning(message), ...args);
  }

  public success(message: string, ...args: unknown[]): void {
    console.warn(getCliTextColor.success(message), ...args);
  }
}
