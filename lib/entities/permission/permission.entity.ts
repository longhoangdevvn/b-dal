import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { PermissionGroupEntity } from '../permission-group/permission-group.entity';

@Entity('permissions')
export class PermissionEntity extends BaseEntity {
  @Column('varchar', { unique: true, nullable: false })
  code: string;

  @Column('varchar', { nullable: false })
  name: string;

  @ManyToOne('PermissionGroupEntity', 'permissions')
  group: PermissionGroupEntity;
}
