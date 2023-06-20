import { IsInt, IsMongoId, Max, Length, Min } from 'class-validator';
import { DATA_MIN_MAX } from '../../../core/helpers/index.js';

export default class CreateCommentDto {
  @Length(DATA_MIN_MAX.commentLength[0], DATA_MIN_MAX.commentLength[1])
  public text!: string;

  @IsMongoId()
  public offerId!: string;

  @IsMongoId()
  public userId!: string;

  @IsInt()
  @Min(DATA_MIN_MAX.rating[0])
  @Max(DATA_MIN_MAX.rating[1])
  public rating!: number;
}
