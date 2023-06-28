import { ArrayUnique, IsArray, IsBoolean, IsDateString, IsIn, IsInt, IsObject, Max, Min, Length } from 'class-validator';

import { TOffer } from '../../../types/offer.type.js';
import { CITY_NAMES, DATA_MIN_MAX, FEATURES, HOUSING_TYPES } from '../../../core/helpers/index.js';

export default class CreateOfferDto {
  @Length(DATA_MIN_MAX.titleLength[0], DATA_MIN_MAX.titleLength[1])
  public title!: TOffer['title'];

  @Length(DATA_MIN_MAX.descLength[0], DATA_MIN_MAX.descLength[1])
  public description!: TOffer['description'];

  @IsDateString({})
  public postedAt!: TOffer['postedAt'];

  @IsIn(CITY_NAMES)
  public city!: TOffer['city'];

  @IsBoolean()
  public isPremium!: TOffer['isPremium'];

  @IsInt()
  @Min(DATA_MIN_MAX.rating[0])
  @Max(DATA_MIN_MAX.rating[1])
  public rating!: TOffer['rating'];

  @IsIn(HOUSING_TYPES)
  public housing!: TOffer['housing'];

  @IsInt()
  @Min(DATA_MIN_MAX.bedrooms[0])
  @Max(DATA_MIN_MAX.bedrooms[1])
  public bedroomsAmount!: TOffer['bedroomsAmount'];

  @IsInt()
  @Min(DATA_MIN_MAX.capacity[0])
  @Max(DATA_MIN_MAX.capacity[1])
  public capacity!: TOffer['capacity'];

  @IsInt()
  @Min(DATA_MIN_MAX.price[0])
  @Max(DATA_MIN_MAX.price[1])
  public price!: TOffer['price'];

  @IsArray()
  @ArrayUnique()
  @IsIn(FEATURES, {each: true})
  public features!: TOffer['features'];

  public userId!: string;

  @IsInt()
  public commentsAmount!: TOffer['commentsAmount'];

  @IsObject()
  public location!: TOffer['location'];
}
