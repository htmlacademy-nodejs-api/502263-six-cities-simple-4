import { Expose } from 'class-transformer';
import { TOffer } from '../../../types/offer.type';

export default class OfferRdo {
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
  public photos!: TOffer['photos'];

  @Expose()
  public isPremium!: TOffer['isPremium'];

  @Expose()
  public rating!: TOffer['rating'];

  @Expose()
  public commentsAmount!: TOffer['commentsAmount'];
}
