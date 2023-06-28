import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import * as core from 'express-serve-static-core';

import { Controller } from '../../core/controller/controller.abstract.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { CommentServiceInterface } from '../comment/comment-service.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { UnknownRecord } from '../../types/unknown-record.type.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import OfferRDO from './rdo/offer.rdo.js';
import { fillDTO } from '../../core/helpers/index.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import CommentRdo from '../comment/rdo/comment.rdo.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../core/middlewares/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../core/middlewares/private-route.middleware.js';
import { ConfigInterface } from '../../core/config/config.interface.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { UploadImagesResponse, UploadPreviewResponse } from './rdo/upload-image.rdo.js';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../../core/errors/http-error.js';
import { UploadFileMiddleware } from '../../core/middlewares/upload-file.middleware.js';
import { VALIDATE_OBJECT_ID } from './offer.constant.js';


type ParamsGetOffer = {
  offerId: string;
} | ParamsDictionary

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(AppComponent.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(AppComponent.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>
  ) {
    super(logger, configService);

    this.logger.info('Регистрируем руты для OfferController…');
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [new ValidateObjectIdMiddleware(VALIDATE_OBJECT_ID), new DocumentExistsMiddleware(this.offerService, 'Offer', VALIDATE_OBJECT_ID)]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [new PrivateRouteMiddleware(), new ValidateObjectIdMiddleware(VALIDATE_OBJECT_ID), new DocumentExistsMiddleware(this.offerService, 'Offer', VALIDATE_OBJECT_ID)]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [new PrivateRouteMiddleware(), new ValidateObjectIdMiddleware(VALIDATE_OBJECT_ID), new ValidateDtoMiddleware(UpdateOfferDto), new DocumentExistsMiddleware(this.offerService, 'Offer', VALIDATE_OBJECT_ID)]
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [new ValidateObjectIdMiddleware(VALIDATE_OBJECT_ID), new DocumentExistsMiddleware(this.offerService, 'Offer', VALIDATE_OBJECT_ID)]
    });

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId/preview',
      method: HttpMethod.Post,
      handler: this.uploadPreviewImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(VALIDATE_OBJECT_ID),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'preview'),
      ]
    });
    this.addRoute({
      path: '/:offerId/photos',
      method: HttpMethod.Post,
      handler: this.uploadImages,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(VALIDATE_OBJECT_ID),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'photos', true),
      ]
    });
  }

  public async show(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(OfferRDO, offer));
  }

  public async index({ query }: Request, res: Response) {
    const offers = await this.offerService.find(Number(query.amount));
    this.ok(res, fillDTO(OfferRDO, offers));
  }

  public async create(
    {body, user}: Request<UnknownRecord, UnknownRecord, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create({ ...body, userId: user.id });
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRDO, offer));
  }

  public async delete(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);
    await this.commentService.deleteByOfferId(offerId);
    this.noContent(res, offer);
  }

  public async update(
    {body, params}: Request<core.ParamsDictionary | ParamsGetOffer, Record<string, unknown>, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const updatedOffer = await this.offerService.updateById(offerId, body);
    this.ok(res, fillDTO(OfferRDO, updatedOffer));
  }

  public async getComments(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer, object, object>,
    res: Response
  ): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async uploadPreviewImage(req: Request<ParamsGetOffer>, res: Response) {
    if (!req.file?.filename) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Изображение не передано',
        'OfferController',
      );
    }

    const { offerId } = req.params;
    const updateDto = { preview: req.file.filename };
    await this.offerService.updateById(offerId, updateDto);
    this.created(res, fillDTO(UploadPreviewResponse, {updateDto}));
  }

  public async uploadImages({ files, params }: Request<ParamsGetOffer, UnknownRecord, UnknownRecord>, res: Response) {
    if (!Array.isArray(files) || !files.length) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Фотографии не переданы',
        'RentController',
      );
    }

    const { offerId } = params;
    const updateDto = { photos: files.reduce<string[]>((acc, file) => {
      if (file?.filename) {
        acc.push(file.filename);
      }
      return acc;
    }, [])};
    await this.offerService.updateById(offerId, updateDto);
    this.created(res, fillDTO(UploadImagesResponse, updateDto));
  }
}
