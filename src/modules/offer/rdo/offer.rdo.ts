import { Expose, Type } from 'class-transformer';

import { TOffer } from '../../../types/offer.type';
import UserRdo from '../../user/rdo/user.rdo.js';

export default class OfferRDO {
  @Expose()
  public price!: TOffer['price'];

  @Expose()
  public title!: TOffer['title'];

  @Expose()
  public housing!: TOffer['housing'];

  @Expose()
  public postedAt!: TOffer['postedAt'];

  @Expose()
  public city!: TOffer['city'];

  @Expose()
  public preview!: TOffer['preview'];

  @Expose()
  public photos!: TOffer['photos'];

  @Expose()
  public isPremium!: TOffer['isPremium'];

  @Expose()
  public rating!: TOffer['rating'];

  @Expose()
  public commentsAmount!: TOffer['commentsAmount'];

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public user!: UserRdo;
}
