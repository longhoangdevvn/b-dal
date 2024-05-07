import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';
import { TeamsRolesEntity } from '../../entities/teams-roles/teams-roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeamsRolesRepository extends BaseRepository<TeamsRolesEntity> {
  constructor(
    @InjectRepository(TeamsRolesEntity)
    private readonly TeamsRolesRepository: Repository<TeamsRolesEntity>,
  ) {
    super(TeamsRolesRepository);
  }
}
