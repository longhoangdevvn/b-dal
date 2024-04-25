import { Test, TestingModule } from "@nestjs/testing";
import { PermissionGroupEntity, PermissionEntity, RolesPermissionsEntity, RoleEntity } from "../../lib/entities";
import { PermissionGroupRepository, PermissionRepository } from "../../lib/repositories";
import databaseTestConfig from "../test-database.config";

const permissionGroupData = {
  name: 'Test Permission Group',
  code: 'test-permission-group',
};

const permissionData = {
  name: 'Test Permission',
  code: 'test-permission',
}

describe('PermissionEntity', () => {
  let permissionRepository: PermissionRepository;
  let permissionGroupRepository: PermissionGroupRepository;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule(databaseTestConfig).compile();

    permissionRepository = module.get<PermissionRepository>('PermissionEntityRepository');
    permissionGroupRepository = module.get<PermissionGroupRepository>('PermissionGroupEntityRepository');
  })

  let createPermission: PermissionEntity;
  let createPermissionGroup: PermissionGroupEntity;

  it('should create a permission ', async () => {
    createPermissionGroup =  await permissionGroupRepository.save(permissionGroupData);
    createPermission = await permissionRepository.save({
      ...permissionData,
      groupId: createPermissionGroup.id,
    });
    expect(createPermission).toHaveProperty('id');
  });

  // Find a permission
  it('should find a permission', async () => {
    const foundPermission = await permissionRepository.findOne({
      where: {
        id: createPermission.id,
        deletedAt: null,
      },
    });
    expect(foundPermission.id).toBe(createPermission.id);
  });

  // Update a permission
  it('should update a permission', async () => {
    createPermission.name = 'Updated Permission';
    const updatedPermission = await permissionRepository.save(createPermission);
    expect(updatedPermission.name).toBe('Updated Permission');
  });

  // Soft delete a permission
  it('should soft delete a permission', async () => {
    await permissionRepository.softDelete({
      id: createPermission.id,
    });
    const foundPermission = await permissionRepository.findOne({
      where: {
        id: createPermission.id,
        deletedAt: null,
      },
    });
    expect(foundPermission).toBeNull();
  });
});