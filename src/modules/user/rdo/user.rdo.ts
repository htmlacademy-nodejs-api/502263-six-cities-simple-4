import { Expose } from 'class-transformer';

export default class UserRdo {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public email!: string;

  @Expose()
  public userpic!: string;

  @Expose()
  public isPro!: boolean;
}
