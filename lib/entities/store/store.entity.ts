import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { AppEntity } from '../app/app.entity';

@Entity('stores')
export class StoreEntity extends BaseEntity {
  @Column('varchar', { unique: true, nullable: false })
  code: string;

  @Column('varchar', { nullable: false })
  name: string;

  @OneToMany(() => AppEntity, (app) => app.store, { nullable: true })
  apps: AppEntity[];
}
