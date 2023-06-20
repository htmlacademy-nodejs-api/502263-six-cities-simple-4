import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import CreateOfferDto from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { DEFAULT_OFFER_AMOUNT } from './offer.constant.js';

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
      // .populate(DEFAULT_POPULATE_OPTIONS) // TODO populate не работает:
      // — If you are populating a virtual, you must set the localField and foreignField options
      // — Cannot populate path `userId` because it is not in your schema. Set the `strictPopulate` option to false to override.
      // ? вероятно трабл в том, что в БД у предложения в поле user нет сгенерированного id пользователя ?
      .exec();
  }

  public find(amount: number): Promise<DocumentType<OfferEntity>[]> {
    // TODO передавать откуда начинать поиск, так при большом количестве офферов и небольшом лимите всегда будет возвращаться один и тот же набор
    return this.offerModel
      .find({}, {}, {limit: amount || DEFAULT_OFFER_AMOUNT})
      // .populate(DEFAULT_POPULATE_OPTIONS) // TODO
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
      // .populate(DEFAULT_POPULATE_OPTIONS) // TODO
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
