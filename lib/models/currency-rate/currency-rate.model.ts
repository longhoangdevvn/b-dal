import { BaseModel } from '../base.model';

export class CurrencyRateModel extends BaseModel {
  fromCurrencyCode: string;
  toCurrencyCode: string;
  rate: number;
  applyTime: Date;
}
