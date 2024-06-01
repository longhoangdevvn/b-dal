import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { RoleEntity } from '../role/role.entity';
import { PermissionEntity } from '../permission/permission.entity';

@Entity('roles_permissions')
export class RolesPermissionsEntity extends BaseEntity {
  @Column('number', { nullable: false, name: 'role_id' })
  roleId: number;

  @Column('number', { nullable: false, name: 'permission_id' })
  permissionId: number;

  @Column('boolean', { nullable: false, default: false })
  status: boolean;

  @ManyToOne(() => RoleEntity, (role) => role.rolesPermissions, {
    nullable: false,
  })
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @ManyToOne(
    () => PermissionEntity,
    (permission) => permission.rolesPermissions,
    { nullable: false },
  )
  @JoinColumn({ name: 'permission_id' })
  permission: PermissionEntity;
}
