import { Test, TestingModule } from "@nestjs/testing";
import { PermissionGroupEntity, PermissionEntity, RolesPermissionsEntity, RoleEntity } from "../../lib/entities";
import { PermissionGroupRepository, PermissionRepository } from "../../lib/repositories";
import { TypeOrmModule } from "@nestjs/typeorm";

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
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'root',
          password: 'secret',
          database: 'b-test',
          entities: [PermissionGroupEntity, PermissionEntity, RolesPermissionsEntity, RoleEntity],
          synchronize: false,
        }),
        TypeOrmModule.forFeature([PermissionEntity, PermissionGroupEntity]),
      ],
    }).compile();

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
});