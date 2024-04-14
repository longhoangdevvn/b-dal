import { BaseModel } from '../base.model';

export class PermissionModel extends BaseModel {
  code: string;
  name: string;
  groupId: string;
}
