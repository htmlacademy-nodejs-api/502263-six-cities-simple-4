import typegoose, {
  defaultClasses,
  getModelForClass,
  Ref,
} from '@typegoose/typegoose';

import { OfferEntity } from '../offer/offer.entity.js';
import { UserEntity } from '../user/user.entity.js';
import { DATA_MIN_MAX } from '../../core/helpers/index.js';

const { prop, modelOptions } = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
  },
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({
    trim: true,
    required: true,
    minlength: DATA_MIN_MAX.commentLength[0],
    maxlength: DATA_MIN_MAX.commentLength[1],
  })
  public text!: string;

  @prop({ ref: OfferEntity, required: true })
  public offerId!: Ref<OfferEntity>;

  @prop({ ref: UserEntity, required: true })
  public userId!: Ref<UserEntity>;

  @prop({ required: true })
  public rating!: number;
}

export const CommentModel = getModelForClass(CommentEntity);
