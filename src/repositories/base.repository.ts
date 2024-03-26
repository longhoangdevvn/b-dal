import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';

export class BaseAbstractRepository<T> {
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
}
