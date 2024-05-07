import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { StoreEntity } from '../store/store.entity';
import { TeamsAppsEntity } from '../teams-apps/teams-apps.entity';

@Entity('apps')
export class AppEntity extends BaseEntity {
  @Column('varchar', { unique: true, nullable: false })
  code: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: true, name: 'package_name' })
  packageName: string;

  @Column('number', { nullable: true, name: 'store_id' })
  storeId: number;

  @ManyToOne(() => StoreEntity, (store) => store.apps, { nullable: false })
  @JoinColumn({ name: 'store_id' })
  store: StoreEntity;

  @OneToMany(() => TeamsAppsEntity, (teamsApps) => teamsApps.app)
  teamsApps: TeamsAppsEntity[];
}
