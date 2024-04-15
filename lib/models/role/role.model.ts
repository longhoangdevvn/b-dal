import { BaseModel } from '../base.model';

export class RoleModel extends BaseModel {
  code: string;
  name: string;
  description?: string | null;
}
