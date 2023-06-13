import { TOffer } from '../../../types/offer.type';

export default class UpdateOfferDto implements Partial<TOffer> {
  public title?: TOffer['title'];
  public description?: TOffer['description'];
  public postedAt?: TOffer['postedAt'];
  public photos?: TOffer['photos'];
  public housing?: TOffer['housing'];
  public price?: TOffer['price'];
}
