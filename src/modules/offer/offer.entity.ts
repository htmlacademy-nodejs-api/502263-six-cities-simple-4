import typegoose, {defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { TOffer } from '../../types/offer.type.js';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  },
  options: {
    allowMixed: 0
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true})
  public title!: TOffer['title'];

  @prop({trim: true})
  public description!: TOffer['description'];

  @prop()
  public postedAt!: TOffer['postedAt'];

  @prop({required: true})
  public city!: TOffer['city'];

  @prop()
  public photos!: TOffer['photos'];

  @prop({default: false})
  public isPremium!: TOffer['isPremium'];

  @prop()
  public rating!: TOffer['rating'];

  @prop()
  public housing!: TOffer['housing'];

  @prop()
  public bedroomsAmount!: TOffer['bedroomsAmount'];

  @prop({required: true})
  public capacity!: TOffer['capacity'];

  @prop({required: true})
  public price!: TOffer['price'];

  @prop({required: true})
  public features!: TOffer['features'];

  @prop({required: true})
  public user!: TOffer['user'];

  @prop({default: 0})
  public commentsAmount!: TOffer['commentsAmount'];

  @prop({required: true})
  public location!: TOffer['location'];
}

export const OfferModel = getModelForClass(OfferEntity);
