import { Test, TestingModule } from "@nestjs/testing";
import { RoleEntity, PermissionEntity, PermissionGroupEntity, RolesPermissionsEntity } from "../../lib/entities";
import { PermissionRepository, RoleRepository, PermissionGroupRepository, RolesPermissionsRepository } from "../../lib/repositories";
import databaseTestConfig from "../test-database.config";

describe('Roles-Permissions', () => {
  let roleRepository: RoleRepository;
  let permissionRepository: PermissionRepository;
  let permissionGroupRepository: PermissionGroupRepository;
  let rolesPermissionsRepository: RolesPermissionsRepository;


  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule(databaseTestConfig).compile();
    roleRepository = module.get<RoleRepository>('RoleEntityRepository');
    permissionRepository = module.get<PermissionRepository>('PermissionEntityRepository');
    permissionGroupRepository = module.get<PermissionGroupRepository>('PermissionGroupEntityRepository');
    rolesPermissionsRepository = module.get<RolesPermissionsRepository>('RolesPermissionsEntityRepository');
  })

  let createRole: RoleEntity;
  let createPermission: PermissionEntity;
  let createPermissionGroup: PermissionGroupEntity;
  let createRolesPermissions: RolesPermissionsEntity;

  // Create a roles-permissions
  it('Create a roles-permissions', async () => {
    createRole = await roleRepository.save({
      name: 'Test Role Permissions',
      code: 'test-role-permissions',
    });
    createPermissionGroup = await permissionGroupRepository.save({
      name: 'Test Permission Group-1',
      code: 'test-permission-group-code-1',
    });
    createPermission = await permissionRepository.save({
      name: 'Test Permission-1',
      code: 'test-permission-code-1',
      groupId: createPermissionGroup.id,
    });
    createRolesPermissions = await rolesPermissionsRepository.save({
      roleId: createRole.id,
      permissionId: createPermission.id,
    });
    expect(createRolesPermissions).toBeDefined();
  })
})