import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { PermissionEntity } from '../permission/permission.entity';

@Entity('permission-groups')
export class PermissionGroupEntity extends BaseEntity {
  @Column('varchar', { unique: true, nullable: false })
  code: string;

  @Column('varchar', { nullable: false })
  name: string;

  @OneToMany(() => PermissionEntity, (permission) => permission.permissionGroup)
  permissions: PermissionEntity[];
}
