import { IsBoolean, IsEmail, Matches, Length } from 'class-validator';
import { DATA_MIN_MAX, IMAGE_URL_REGEXP } from '../../../core/helpers/index.js';
export default class CreateUserDto {
  @Length(DATA_MIN_MAX.userNameLength[0], DATA_MIN_MAX.userNameLength[1])
  public name!: string;

  @IsEmail()
  public email!: string;

  @Matches(IMAGE_URL_REGEXP)
  public userpic!: string;

  @Length(DATA_MIN_MAX.passwordLength[0], DATA_MIN_MAX.passwordLength[1])
  public password!: string;

  @IsBoolean()
  public isPro!: boolean;
}
