import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';
import { PermissionEntity } from '../../entities';
import { In, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionRepository extends BaseRepository<PermissionEntity> {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly PermissionRepository: Repository<PermissionEntity>,
  ) {
    super(PermissionRepository);
  }

  // List all permissions
  permissions(): Promise<PermissionEntity[]> {
    return this.PermissionRepository.find({
      where: {
        deletedAt: null,
      },
    });
  }

  // Get a permission by id
  permission(id: number): Promise<PermissionEntity> {
    if (!id) {
      return null;
    }
    return this.PermissionRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  // Create a new permission
  createPermission(permission): Promise<PermissionEntity> {
    return this.PermissionRepository.save(permission);
  }

  // Create multiple permissions
  createPermissions(permissions): Promise<PermissionEntity[]> {
    return this.PermissionRepository.save(permissions);
  }

  // Update a permission
  updatePermission(id: number, permission): Promise<UpdateResult> {
    if (!id) {
      return null;
    }
    return this.PermissionRepository.update(id, permission);
  }

  // Destroy a permission
  destroyPermission(id: number): Promise<UpdateResult> {
    if (!id) {
      return null;
    }
    return this.PermissionRepository.softDelete(id);
  }

  // Get permissions by code
  permissionsByCode(codes: string[]): Promise<PermissionEntity[]> {
    return this.PermissionRepository.find({
      where: {
        code: In(codes),
        deletedAt: null,
      },
    });
  }

  // Get permissions by group id
  permissionsByGroupId(groupId: number): Promise<PermissionEntity[]> {
    return this.PermissionRepository.find({
      where: {
        groupId,
        deletedAt: null,
      },
    });
  }
}
