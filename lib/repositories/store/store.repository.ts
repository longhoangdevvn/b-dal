import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';
import { StoreEntity } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StoreRepository extends BaseRepository<StoreEntity> {
  constructor(
    @InjectRepository(StoreEntity)
    private readonly StoreRepository: Repository<StoreEntity>,
  ) {
    super(StoreRepository);
  }
}
