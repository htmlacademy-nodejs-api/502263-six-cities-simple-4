import { TCity } from '../../../types/city.type.js';
import { TFeatures } from '../../../types/features.type.js';
import { TUser } from '../../../types/user.type.js';
import { THousing } from '../../../types/housing.type.js';
import { TLocation } from '../../../types/location.type.js';
import { TOfferPhotos } from '../../../types/offerPhotos.type.js';

export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public postedAt!: Date;
  public city!: TCity;
  public isPremium!: boolean;
  public rating!: number;
  public housing!: THousing;
  public bedroomsAmount!: number;
  public capacity!: number;
  public price!: number;
  public features!: TFeatures[];
  public user!: TUser;
  public commentsAmount!: number;
  public location!: TLocation;
  public photos!: {
    preview: string
    all: TOfferPhotos
  };
}
