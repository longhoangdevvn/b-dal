import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('stores')
export class StoreEntity extends BaseEntity {
  @Index({ unique: true })
  @Column('varchar', { unique: true, nullable: false })
  code: string;

  @Column('varchar', { nullable: false })
  name: string;
}
