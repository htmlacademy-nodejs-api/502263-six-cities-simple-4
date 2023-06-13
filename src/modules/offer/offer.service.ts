import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import CreateOfferDto from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { DEFAULT_OFFER_AMOUNT, DEFAULT_POPULATE_OPTIONS } from './offer.constant.js';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.success(`Создано новое предложение: "${dto.title}"`);

    return result;
  }

  public findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(DEFAULT_POPULATE_OPTIONS)
      .exec();
  }

  public find(amount: number): Promise<DocumentType<OfferEntity>[]> {
    // TODO передавать откуда начинать поиск, так при большом количестве офферов и небольшом лимите всегда будет возвращаться один и тот же набор
    const limit = amount >= DEFAULT_OFFER_AMOUNT ? DEFAULT_OFFER_AMOUNT : amount;
    return this.offerModel
      .find({}, {}, {limit})
      .populate(DEFAULT_POPULATE_OPTIONS)
      .exec();
  }

  public deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(DEFAULT_POPULATE_OPTIONS)
      .exec();
  }

  public incCommentsAmount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentsAmount: 1,
      }}).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return Boolean(await this.offerModel
      .exists({_id: documentId}));
  }
}
