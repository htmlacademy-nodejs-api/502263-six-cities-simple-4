import { LoggerInterface } from '../core/logger/logger.interface.js';
import { ConfigInterface } from '../core/config/config.interface.js';
import { RestSchema } from '../core/config/rest.schema.js';
import { AppComponent } from '../types/app-component.enum.js';
import { inject, injectable } from 'inversify';
import { DatabaseClientInterface } from '../core/database-client/database-client.interface';
import { getMongoURI } from '../core/helpers/index.js';
import express, { Express } from 'express';
import { ControllerInterface } from '../core/controller/controller.interface.js';

@injectable()
export default class RestApplication {
  private expressApplication: Express;

  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.ConfigInterface) private readonly config: ConfigInterface<RestSchema>,
    @inject(AppComponent.DatabaseClientInterface) private readonly databaseClient: DatabaseClientInterface,
    @inject(AppComponent.OfferController) private readonly offerController: ControllerInterface,
  ) {
    this.expressApplication = express();
  }

  private async _initDb() {
    this.logger.info('Инициализация базы данных…');

    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.databaseClient.connect(mongoUri);
    this.logger.info('База данных инициирована успешно');
  }

  private async _initServer() {
    this.logger.info('Поднимаем сервер…');
    const port = this.config.get('PORT');

    this.expressApplication.listen(port);
    this.logger.success(`🚀 Сервер запущен на http://localhost:${port}`);
  }

  private async _initRoutes() {
    this.logger.info('Инициализация контроллеров…');
    this.expressApplication.use('/offers', this.offerController.router);
    this.logger.success('Контроллеры успешно созданы.');
  }

  public async init() {
    this.logger.info(`Приложение запускается… Значение env переменной $PORT: ${this.config.get('PORT')}`);

    await this._initDb();
    await this._initRoutes();
    await this._initServer();
    this.logger.success('REST приложение успешно запущено');
  }
}
