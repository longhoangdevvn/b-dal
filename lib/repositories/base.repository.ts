import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class BaseRepository<T> {
  private entity: Repository<T>;
  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  public async save(data: DeepPartial<T>): Promise<T> {
    return await this.entity.save(data);
  }

  public async saveMany(data: DeepPartial<T[]>): Promise<T[]> {
    return await this.entity.save(data);
  }

  public create(data: DeepPartial<T>): T {
    return this.entity.create(data);
  }

  public createMany(data: DeepPartial<T[]>): T[] {
    return this.entity.create(data);
  }

  public async findOne(options: FindOneOptions): Promise<T> {
    return await this.entity.findOne(options);
  }

  public async find(options: FindManyOptions): Promise<T[]> {
    return await this.entity.find(options);
  }

  public async update(
    options: FindOptionsWhere<T>,
    data: QueryDeepPartialEntity<T>,
  ) {
    return await this.entity.update(options, data);
  }

  public async softDelete(options: FindOptionsWhere<T>) {
    return await this.entity.softDelete(options);
  }

  public async restore(options: FindOptionsWhere<T>) {
    return await this.entity.restore(options);
  }

  public async delete(options: FindOptionsWhere<T>) {
    return await this.entity.delete(options);
  }
}
