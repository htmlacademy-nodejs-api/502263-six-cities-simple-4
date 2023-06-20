import { Matches, Length } from 'class-validator';
import { DATA_MIN_MAX, IMAGE_URL_REGEXP } from '../../../core/helpers/index.js';

export default class UpdateUserDto {
  @Matches(IMAGE_URL_REGEXP)
  public userpic?: string;

  @Length(DATA_MIN_MAX.userNameLength[0], DATA_MIN_MAX.userNameLength[1])
  public name?: string;
}
