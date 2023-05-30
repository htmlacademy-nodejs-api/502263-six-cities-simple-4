import { TUser } from '../../../types/user.type';

export default class CreateCommentDto {
  public text!: string;
  public rating!: number;
  public author!: TUser;
}
