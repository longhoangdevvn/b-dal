import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { PermissionGroupEntity } from '../permission-group/permission-group.entity';
import { RolesPermissionsEntity } from '../roles-permissions/roles-permissions.entity';

@Entity('permissions')
export class PermissionEntity extends BaseEntity {
  @Column('varchar', { unique: true, nullable: false })
  code: string;

  @Column('varchar', { nullable: false })
  name: string;

  @ManyToOne(
    () => PermissionGroupEntity,
    (permissionGroup) => permissionGroup.permissions,
    { nullable: false },
  )
  permissionGroup: PermissionGroupEntity;

  @OneToMany(
    () => RolesPermissionsEntity,
    (rolesPermissions) => rolesPermissions.permission,
  )
  rolesPermissions: RolesPermissionsEntity[];
}
