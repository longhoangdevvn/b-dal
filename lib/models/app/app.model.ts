import { BaseModel } from '../base.model';

export class AppModel extends BaseModel {
  name: string;
  code: string;
  packageName?: string;
  storeId: string;
}
