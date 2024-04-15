import { Injectable } from '@nestjs/common';
import { RoleEntity } from '../../entities';
import { BaseRepository } from '../base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleRepository extends BaseRepository<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly RoleRepository: Repository<RoleEntity>,
  ) {
    super(RoleRepository);
  }
}
