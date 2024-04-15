import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';
import { PermissionEntity } from '../../entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionRepository extends BaseRepository<PermissionEntity> {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly PermissionRepository: Repository<PermissionEntity>,
  ) {
    super(PermissionRepository);
  }
}
