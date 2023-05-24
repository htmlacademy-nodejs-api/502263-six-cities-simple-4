import typegoose, {defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { TCity } from '../../types/city.type.js';
import { TOfferPhotos } from '../../types/offerPhotos.type.js';
import { THousing } from '../../types/housing.type.js';
import { TFeatures } from '../../types/features.type.js';
import { TUser } from '../../types/user.type.js';
import { TLocation } from '../../types/location.type.js';

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
  public title!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public postedAt!: Date;

  @prop({required: true})
  public city!: TCity;

  @prop()
  public photos!: {
    preview: string
    all: TOfferPhotos
  };

  @prop({default: false})
  public isPremium!: boolean;

  @prop()
  public rating!: number;

  @prop()
  public housing!: THousing;

  @prop()
  public bedroomsAmount!: number;

  @prop({required: true})
  public capacity!: number;

  @prop({required: true})
  public price!: number;

  @prop({required: true})
  public features!: TFeatures[];

  @prop({required: true})
  public user!: TUser;

  @prop({default: 0})
  public commentsAmount!: number;

  @prop({required: true})
  public location!: TLocation;
}

export const OfferModel = getModelForClass(OfferEntity);
