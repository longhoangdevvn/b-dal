import { UserEntity } from 'lib/entities/user/user.entity';
import { BaseAbstractRepository } from '../base.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository extends BaseAbstractRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
  ) {
    super(UserRepository);
  }
}
