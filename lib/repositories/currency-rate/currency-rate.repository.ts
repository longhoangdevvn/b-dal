import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';
import { CurrencyRateEntity } from '../../entities/currency-rate/currency-rate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CurrencyRateRepository extends BaseRepository<CurrencyRateEntity> {
  constructor(
    @InjectRepository(CurrencyRateEntity)
    public readonly CurrencyRateRepository: Repository<CurrencyRateEntity>,
  ) {
    super(CurrencyRateRepository);
  }
}
