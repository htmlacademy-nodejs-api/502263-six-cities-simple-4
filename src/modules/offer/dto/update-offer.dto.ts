import { IsArray, IsDateString, IsInt, IsString, Max, Length, Min } from 'class-validator';

import { TOffer } from '../../../types/offer.type';
import { DATA_MIN_MAX } from '../../../core/helpers/index.js';

export default class UpdateOfferDto implements Partial<TOffer> {
  @Length(DATA_MIN_MAX.titleLength[0], DATA_MIN_MAX.titleLength[1])
  public title!: TOffer['title'];

  @Length(DATA_MIN_MAX.descLength[0], DATA_MIN_MAX.descLength[1])
  public description!: TOffer['description'];

  @IsDateString()
  public postedAt?: TOffer['postedAt'];

  @IsArray()
  public photos?: TOffer['photos'];

  @IsString()
  public housing?: TOffer['housing'];

  @IsInt()
  @Min(DATA_MIN_MAX.price[0])
  @Max(DATA_MIN_MAX.price[1])
  public price?: TOffer['price'];
}
