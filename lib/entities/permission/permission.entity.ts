import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { PermissionGroupEntity } from '../permission-group/permission-group.entity';
import { RolesPermissionsEntity } from '../roles-permissions/roles-permissions.entity';

@Entity('permissions')
export class PermissionEntity extends BaseEntity {
  @Column('varchar', { unique: true, nullable: false })
  code: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: true, name: 'group_id' })
  groupId: number;

  @ManyToOne(
    () => PermissionGroupEntity,
    (permissionGroup) => permissionGroup.permissions,
    { nullable: false },
  )
  @JoinColumn({ name: 'group_id' })
  permissionGroup: PermissionGroupEntity;

  @OneToMany(
    () => RolesPermissionsEntity,
    (rolesPermissions) => rolesPermissions.permission,
  )
  rolesPermissions: RolesPermissionsEntity[];
}
