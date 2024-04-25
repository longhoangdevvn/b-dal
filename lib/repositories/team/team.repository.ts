import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamEntity } from '../../entities/team/team.entity';
import { Repository } from 'typeorm';
import { BaseRepository } from '../base.repository';

@Injectable()
export class TeamRepository extends BaseRepository<TeamEntity> {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamRepository: Repository<TeamEntity>,
  ) {
    super(teamRepository);
  }
}
