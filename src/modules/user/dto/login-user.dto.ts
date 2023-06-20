import { IsEmail, Length } from 'class-validator';
import { DATA_MIN_MAX } from '../../../core/helpers/index.js';

export default class LoginUserDto {
  @IsEmail()
  public email!: string;

  @Length(DATA_MIN_MAX.passwordLength[0], DATA_MIN_MAX.passwordLength[1])
  public password!: string;
}
