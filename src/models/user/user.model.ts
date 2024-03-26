import { BaseModel } from '../base.model';

export class UserModel extends BaseModel {
  email: string;
  password: string;
  fulName: string;
}
