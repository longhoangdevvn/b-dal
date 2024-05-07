import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { TeamEntity } from '../team/team.entity';
import { AppEntity } from '../app/app.entity';

@Entity('teams_apps')
export class TeamsAppsEntity extends BaseEntity {
  @Column('number', { nullable: false, name: 'team_id' })
  teamId: number;

  @Column('number', { nullable: false, name: 'app_id' })
  appId: number;

  @ManyToOne(() => TeamEntity, (team) => team.teamsApps)
  @JoinColumn({ name: 'team_id' })
  team: TeamEntity;

  @ManyToOne(() => AppEntity, (app) => app.teamsApps)
  @JoinColumn({ name: 'app_id' })
  app: AppEntity;
}
