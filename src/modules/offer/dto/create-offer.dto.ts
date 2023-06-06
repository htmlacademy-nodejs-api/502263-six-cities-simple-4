import { TOffer } from '../../../types/offer.type.js';

export default class CreateOfferDto {
  public title!: TOffer['title'];
  public description!: TOffer['description'];
  public postedAt!: TOffer['postedAt'];
  public city!: TOffer['city'];
  public isPremium!: TOffer['isPremium'];
  public rating!: TOffer['rating'];
  public housing!: TOffer['housing'];
  public bedroomsAmount!: TOffer['bedroomsAmount'];
  public capacity!: TOffer['capacity'];
  public price!: TOffer['price'];
  public features!: TOffer['features'];
  public user!: TOffer['user'];
  public commentsAmount!: TOffer['commentsAmount'];
  public location!: TOffer['location'];
  public photos!: TOffer['photos'];
}
