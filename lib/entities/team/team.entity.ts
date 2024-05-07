import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { TeamsRolesEntity } from '../teams-roles/teams-roles.entity';

@Entity('teams')
export class TeamEntity extends BaseEntity {
  @Column('varchar', { unique: true, nullable: false })
  code: string;

  @Column('varchar', { nullable: false })
  name: string;

  @OneToMany(() => TeamsRolesEntity, (teamsRoles) => teamsRoles.team)
  teamsRoles: TeamsRolesEntity[];
}
