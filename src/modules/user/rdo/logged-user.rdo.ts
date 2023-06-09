import { Expose } from 'class-transformer';

export default class LoggedUserRdo {
  @Expose()
  public token!: string;

  @Expose()
  public email!: string;

  @Expose()
  public userpic!: string;

  @Expose()
  public name!: string;

  @Expose()
  public isPro!: boolean;
}
