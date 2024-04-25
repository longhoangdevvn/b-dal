import { Injectable } from '@nestjs/common';
import { AppEntity } from '../../entities/app/app.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../base.repository';

@Injectable()
export class AppRepository extends BaseRepository<AppEntity> {
  constructor(
    @InjectRepository(AppEntity)
    private readonly AppRepository: Repository<AppEntity>,
  ) {
    super(AppRepository);
  }
}
