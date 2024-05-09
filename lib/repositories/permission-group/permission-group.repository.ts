import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionGroupEntity } from '../../entities';
import { FindOptionsWhere, In, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class PermissionGroupRepository extends BaseRepository<PermissionGroupEntity> {
  constructor(
    @InjectRepository(PermissionGroupEntity)
    private readonly PermissionGroupRepository: Repository<PermissionGroupEntity>,
  ) {
    super(PermissionGroupRepository);
  }

  // List all permission groups
  permissionGroups(): Promise<PermissionGroupEntity[]> {
    const where: FindOptionsWhere<PermissionGroupEntity> = {
      deletedAt: null,
    };
    return this.PermissionGroupRepository.find({
      where,
    });
  }
  // Get a permission group by id
  permissionGroup(id: number): Promise<PermissionGroupEntity> {
    if (!id) {
      return null;
    }
    const where: FindOptionsWhere<PermissionGroupEntity> = {
      id,
      deletedAt: null,
    };
    return this.PermissionGroupRepository.findOne({
      where,
    });
  }

  // Create a new permission group
  createPermissionGroup(permissionGroup): Promise<PermissionGroupEntity> {
    return this.PermissionGroupRepository.save(permissionGroup);
  }

  // Create multiple permission groups
  createPermissionGroups(permissionGroups): Promise<PermissionGroupEntity[]> {
    return this.PermissionGroupRepository.save(permissionGroups);
  }

  // Update a permission group
  updatePermissionGroup(id: number, permissionGroup): Promise<UpdateResult> {
    if (!id) {
      return null;
    }
    const where: FindOptionsWhere<PermissionGroupEntity> = {
      id,
      deletedAt: null,
    };

    return this.PermissionGroupRepository.update(where, permissionGroup);
  }

  // Destroy a permission group
  destroyPermissionGroup(id: number) {
    return this.PermissionGroupRepository.softDelete(id);
  }

  // Get permission group by code
  permissionGroupByCode(code: string): Promise<PermissionGroupEntity> {
    if (!code) {
      return null;
    }
    const where: FindOptionsWhere<PermissionGroupEntity> = {
      code,
      deletedAt: null,
    };
    return this.PermissionGroupRepository.findOne({
      where,
    });
  }

  // Get permission group by array of codes
  permissionGroupByCodes(codes: string[]): Promise<PermissionGroupEntity[]> {
    if (!codes.length) {
      return null;
    }
    const where: FindOptionsWhere<PermissionGroupEntity> = {
      code: In(codes),
      deletedAt: null,
    };
    return this.PermissionGroupRepository.find({
      where,
    });
  }
}
