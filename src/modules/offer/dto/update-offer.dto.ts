import { IsDateString, IsInt, Max, Length, Min, IsObject, IsIn, IsOptional } from 'class-validator';

import { TOffer } from '../../../types/offer.type';
import { DATA_MIN_MAX, HOUSING_TYPES } from '../../../core/helpers/index.js';

export default class UpdateOfferDto implements Partial<TOffer> {
  @IsOptional()
  @Length(DATA_MIN_MAX.titleLength[0], DATA_MIN_MAX.titleLength[1])
  public title?: TOffer['title'];

  @IsOptional()
  @Length(DATA_MIN_MAX.descLength[0], DATA_MIN_MAX.descLength[1])
  public description?: TOffer['description'];

  @IsOptional()
  @IsDateString()
  public postedAt?: TOffer['postedAt'];

  @IsOptional()
  @IsObject()
  public photos?: TOffer['photos'];

  @IsOptional()
  @IsIn(HOUSING_TYPES)
  public housing?: TOffer['housing'];

  @IsOptional()
  @IsInt()
  @Min(DATA_MIN_MAX.price[0])
  @Max(DATA_MIN_MAX.price[1])
  public price?: TOffer['price'];
}
