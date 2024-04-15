import { Test, TestingModule } from "@nestjs/testing";
import { PermissionGroupEntity, PermissionEntity, RolesPermissionsEntity, RoleEntity } from "../../lib/entities";
import { PermissionRepository } from "../../lib/repositories";
import { TypeOrmModule } from "@nestjs/typeorm";

describe('PermissionGroupEntity', () => {
  let permissionRepository: PermissionRepository;
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
        TypeOrmModule.forFeature([PermissionEntity]),
      ],
    }).compile();

    permissionRepository = module.get<PermissionRepository>('PermissionEntityRepository');
  })

  it('should create a permission ', async () => {
    const permissionGroup = permissionRepository.create({
      name: 'Test Permission',
      code: 'test-permission',
      groupId: 1,
    });
    permissionRepository = await permissionRepository.save(permissionGroup);
    expect(permissionRepository).toHaveProperty('id');
  });

});