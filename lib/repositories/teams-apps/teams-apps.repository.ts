import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';
import { TeamsAppsEntity } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeamsAppsRepository extends BaseRepository<TeamsAppsEntity> {
  constructor(
    @InjectRepository(TeamsAppsEntity)
    private readonly TeamsAppsRepository: Repository<TeamsAppsEntity>,
  ) {
    super(TeamsAppsRepository);
  }
}
