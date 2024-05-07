import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { RoleEntity } from '../role/role.entity';
import { TeamEntity } from '../team/team.entity';

@Entity('teams_roles')
export class TeamsRolesEntity extends BaseEntity {
  @Column('number', { nullable: false, name: 'team_id' })
  teamId: number;

  @Column('number', { nullable: false, name: 'role_id' })
  roleId: number;

  @ManyToOne(() => TeamEntity, (team) => team.teamsRoles)
  @JoinColumn({ name: 'team_id' })
  team: TeamEntity;

  @ManyToOne(() => RoleEntity, (role) => role.teamsRoles)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;
}
