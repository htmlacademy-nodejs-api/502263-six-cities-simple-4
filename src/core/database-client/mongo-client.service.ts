import { inject, injectable } from 'inversify';
import mongoose, { Mongoose } from 'mongoose';
import { setTimeout } from 'node:timers/promises';
import { DatabaseClientInterface } from './database-client.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { DB } from '../helpers/index.js';

@injectable()
export default class MongoClientService implements DatabaseClientInterface {
  private isConnected = false;
  private mongooseInstance: Mongoose | null = null;

  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface
  ) {}

  private async _connectWithRetry(uri: string): Promise<Mongoose> {
    let attempt = 0;
    while (attempt < DB.RetryConnections.Count) {
      try {
        return await mongoose.connect(uri);
      } catch (error) {
        attempt++;
        this.logger.warn(`Пробуем подключиться к БД. Номер попытки: ${attempt}`);
        await setTimeout(DB.RetryConnections.Timeout);
      }
    }

    this.logger.error(`Не удалось подключиться к БД. Количество попыток подключения: ${attempt}`);
    throw new Error('БД не подключена.');
  }

  private async _connect(uri:string): Promise<void> {
    this.mongooseInstance = await this._connectWithRetry(uri);
    this.isConnected = true;
  }

  private async _disconnect(): Promise<void> {
    await this.mongooseInstance?.disconnect();
    this.isConnected = false;
    this.mongooseInstance = null;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnected) {
      throw new Error('Клиент MongoDB уже подключен.');
    }

    if (uri.includes('undefined')) {
      throw new Error(`Неверное обращение к БД: не определено одно или более обязательных полей. Текущий запрос: ${uri}`);
    }

    this.logger.info('Подключаемся к MongoDB…');
    await this._connect(uri);
    this.logger.success('Подключение к MongoDB успешно!');
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Отключать нечего, подключение к БД не было реализовано.');
    }

    await this._disconnect();
    this.logger.success('Подключение к БД успешно прервано.');
  }
}
