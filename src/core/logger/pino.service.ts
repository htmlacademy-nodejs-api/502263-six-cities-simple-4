import { LoggerInterface } from './logger.interface.js';
import { Logger, pino } from 'pino';
import { injectable } from 'inversify';

@injectable()
export default class PinoService implements LoggerInterface {
  private readonly logger: Logger;

  constructor() {
    this.logger = pino();
    this.logger.info('Логер создан…');
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public error(message: string, ...args: unknown[]): void {
    this.logger.error(message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.silent(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }

  public success(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }
}
