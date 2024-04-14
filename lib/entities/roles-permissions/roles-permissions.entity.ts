import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { RoleEntity } from '../role/role.entity';
import { PermissionEntity } from '../permission/permission.entity';

@Entity('roles_permissions')
export class RolesPermissionsEntity extends BaseEntity {
  @Column('varchar', { nullable: false })
  roleId: string;

  @Column('varchar', { nullable: false })
  permissionId: string;

  @ManyToOne(() => RoleEntity, (role) => role.rolesPermissions, {
    nullable: false,
  })
  role: RoleEntity;

  @ManyToOne(
    () => PermissionEntity,
    (permission) => permission.rolesPermissions,
    { nullable: false },
  )
  permission: PermissionEntity;
}
