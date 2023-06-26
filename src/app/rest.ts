import cors from 'cors';
import { inject, injectable } from 'inversify';
import express, { Express } from 'express';

import { LoggerInterface } from '../core/logger/logger.interface.js';
import { ConfigInterface } from '../core/config/config.interface.js';
import { RestSchema } from '../core/config/rest.schema.js';
import { AppComponent } from '../types/app-component.enum.js';
import { DatabaseClientInterface } from '../core/database-client/database-client.interface.js';
import { getFullServerPath, getMongoURI } from '../core/helpers/index.js';
import { ControllerInterface } from '../core/controller/controller.interface.js';
import { ExceptionFilterInterface } from '../core/exception-filters/exception-filter.interface.js';
import { AuthenticateMiddleware } from '../core/middlewares/authenticate.middleware.js';

@injectable()
export default class RestApplication {
  private expressApplication: Express;

  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.ConfigInterface) private readonly config: ConfigInterface<RestSchema>,
    @inject(AppComponent.DatabaseClientInterface) private readonly databaseClient: DatabaseClientInterface,
    @inject(AppComponent.UserController) private readonly userController: ControllerInterface,
    @inject(AppComponent.OfferController) private readonly offerController: ControllerInterface,
    @inject(AppComponent.HttpErrorExceptionFilter) private readonly httpErrorExceptionFilter: ExceptionFilterInterface,
    @inject(AppComponent.CommentController) private commentController: ControllerInterface,
    @inject(AppComponent.BaseExceptionFilter) private readonly baseExceptionFilter: ExceptionFilterInterface,
    @inject(AppComponent.ValidationExceptionFilter) private readonly validationExceptionFilter: ExceptionFilterInterface,
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

  private async _initMiddleware() {
    this.logger.info('Инициализация глобальных middleware…');
    const authenticateMiddleware = new AuthenticateMiddleware(this.config.get('JWT_SECRET'));

    this.expressApplication.use(express.json());
    this.expressApplication.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
    this.expressApplication.use(cors());

    this.logger.success('Инициализация глобальных middleware завершена успешно');
  }

  private async _initRoutes() {
    this.logger.info('Инициализация маршрутов...');

    this.expressApplication.use('/users', this.userController.router);
    this.expressApplication.use('/offers', this.offerController.router);
    this.expressApplication.use('/comments', this.commentController.router);
    this.expressApplication.use('/upload', express.static(this.config.get('UPLOAD_DIRECTORY')));
    this.expressApplication.use('/static', express.static(this.config.get('STATIC_DIRECTORY_PATH')));

    this.logger.success('Инициализация маршрутов завершена успешно');
  }

  private async _initExceptionFilters() {
    this.logger.info('Инициализация Exception filters...');
    this.expressApplication.use(this.validationExceptionFilter.catch.bind(this.validationExceptionFilter));
    this.expressApplication.use(this.httpErrorExceptionFilter.catch.bind(this.httpErrorExceptionFilter));
    this.expressApplication.use(this.baseExceptionFilter.catch.bind(this.baseExceptionFilter));
    this.logger.success('Инициализация Exception filters завершена успешно');
  }

  private async _initServer() {
    this.logger.info('Инициализация сервера…');

    const port = this.config.get('PORT');

    this.expressApplication.listen(port);
    this.logger.success(`🚀 Cервер запущен на ${getFullServerPath(this.config.get('HOST'), this.config.get('PORT'))}`);
  }

  public async init() {
    this.logger.info(`Приложение запускается… Значение env переменной $PORT: ${this.config.get('PORT')}`);

    await this._initDb();
    await this._initMiddleware();
    await this._initRoutes();
    await this._initServer();
    await this._initExceptionFilters();
    this.logger.success('REST приложение успешно запущено');
  }
}
