import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { RolesPermissionsEntity } from '../roles-permissions/roles-permissions.entity';
import { TeamsRolesEntity } from '../teams-roles/teams-roles.entity';

@Entity('roles')
export class RoleEntity extends BaseEntity {
  @Column('varchar', { unique: true, nullable: false })
  code: string;
  @Column('varchar', { nullable: false })
  name: string;
  @Column('varchar', { nullable: true })
  description: string;
  @OneToMany(
    () => RolesPermissionsEntity,
    (rolesPermissions) => rolesPermissions.permission,
  )
  rolesPermissions: RolesPermissionsEntity[];
  @OneToMany(() => TeamsRolesEntity, (teamsRoles) => teamsRoles.role)
  teamsRoles: TeamsRolesEntity[];
}
