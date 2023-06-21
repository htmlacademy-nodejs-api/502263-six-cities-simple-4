import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';

import { ConfigInterface } from '../../core/config/config.interface';
import { RestSchema } from '../../core/config/rest.schema';
import { Controller } from '../../core/controller/controller.abstract.js';
import HttpError from '../../core/errors/http-error.js';
import { fillDTO } from '../../core/helpers/index.js';
import { LoggerInterface } from '../../core/logger/logger.interface';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import CreateUserDto from './dto/create-user.dto.js';
import LoginUserDto from './dto/login-user.dto.js';
import UserRdo from './rdo/user.rdo.js';
import { UserServiceInterface } from './user-service.interface';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-objectid.middleware.js';
import { UploadFileMiddleware } from '../../core/middlewares/upload-file.middleware.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface)
    protected readonly logger: LoggerInterface,
    @inject(AppComponent.UserServiceInterface)
    private readonly userService: UserServiceInterface,
    @inject(AppComponent.ConfigInterface)
    private readonly configService: ConfigInterface<RestSchema>
  ) {
    super(logger);

    this.logger.info('Регистрация маршрутов для UserController…');
    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)],
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)],
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });
  }

  public async create(
    {
      body,
    }: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `Пользователь с email «${body.email}» уже существует`,
        'UserController'
      );
    }

    const result = await this.userService.create(
      body,
      this.configService.get('SALT')
    );
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login(
    {
      body,
    }: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>,
    _res: Response
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (!existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `Пользователя с email ${body.email} не существует`,
        'UserController'
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Метод не закончен',
      'UserController'
    );
  }

  public async uploadAvatar(req: Request, res: Response) {
    this.created(res, {filepath: req.file?.path});
  }
}
