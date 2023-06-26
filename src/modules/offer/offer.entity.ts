import typegoose, { Ref, defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { TOffer } from '../../types/offer.type.js';
import { UserEntity } from '../user/user.entity.js';

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

  @prop({default: []})
  public photos!: TOffer['photos'];

  @prop({default: ''})
  public preview!: TOffer['preview'];

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

  @prop({ref: UserEntity,required: true})
  public userId!: Ref<UserEntity>;

  @prop({default: 0})
  public commentsAmount!: TOffer['commentsAmount'];

  @prop({required: true})
  public location!: TOffer['location'];
}

export const OfferModel = getModelForClass(OfferEntity);
