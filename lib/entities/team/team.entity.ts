import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('teams')
export class TeamEntity extends BaseEntity {
  @Column('varchar', { unique: true, nullable: false })
  code: string;

  @Column('varchar', { nullable: false })
  name: string;
}
