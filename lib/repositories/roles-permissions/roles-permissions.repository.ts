import { Injectable } from '@nestjs/common';
import { RolesPermissionsEntity } from '../../entities';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesPermissionsRepository extends BaseRepository<RolesPermissionsEntity> {
  constructor(
    @InjectRepository(RolesPermissionsEntity)
    private readonly RolesPermissionsRepository: Repository<RolesPermissionsEntity>,
  ) {
    super(RolesPermissionsRepository);
  }
}
