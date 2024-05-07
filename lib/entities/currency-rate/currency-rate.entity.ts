import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('currency_rates')
export class CurrencyRateEntity extends BaseEntity {
  @Column('varchar', { nullable: false, name: 'from_currency_code' })
  fromCurrencyCode: string;

  @Column('varchar', { nullable: false, name: 'to_currency_code' })
  toCurrencyCode: string;

  @Column('float', { nullable: false })
  rate: number;

  @Column('datetime', { nullable: false, name: 'apply_time' })
  applyTime: Date;
}
