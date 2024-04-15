import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionGroupEntity } from '../../entities';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionGroupRepository extends BaseRepository<PermissionGroupEntity> {
  constructor(
    @InjectRepository(PermissionGroupEntity)
    private readonly PermissionGroupRepository: Repository<PermissionGroupEntity>,
  ) {
    super(PermissionGroupRepository);
  }
}
