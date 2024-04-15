import { Test, TestingModule } from "@nestjs/testing";
import { PermissionGroupEntity, PermissionEntity, RolesPermissionsEntity, RoleEntity } from "../../lib/entities";
import { PermissionGroupRepository } from "../../lib/repositories";
import { TypeOrmModule } from "@nestjs/typeorm";
describe('PermissionGroupEntity', () => {
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
        TypeOrmModule.forFeature([PermissionGroupEntity, PermissionEntity]),
      ],
    }).compile();

    permissionGroupRepository = module.get<PermissionGroupRepository>('PermissionGroupEntityRepository');
  })


  let createdPermissionGroup: PermissionGroupEntity;

  it('should create a permission group', async () => {
    const permissionGroup = permissionGroupRepository.create({
      name: 'Test Permission Group',
      code: 'test-permission-group',
    });
    createdPermissionGroup = await permissionGroupRepository.save(permissionGroup);
    expect(createdPermissionGroup).toHaveProperty('id');
  });

  it('should update a permission group', async () => {
    // Assuming `createdPermissionGroup` is the permission group created in the previous test
    createdPermissionGroup.name = 'Updated Permission Group';
    const updatedPermissionGroup = await permissionGroupRepository.save(createdPermissionGroup);
    expect(updatedPermissionGroup.name).toBe('Updated Permission Group');
  });

  it('should soft delete a permission group', async () => {
    // Assuming `createdPermissionGroup` is the permission group created in the previous test
    await permissionGroupRepository.softDelete({
      id: createdPermissionGroup.id,
    });
    const foundPermissionGroup = await permissionGroupRepository.findOne({
      where: {
        id: createdPermissionGroup.id,
        deletedAt: null,
      },
    });
    expect(foundPermissionGroup).toBeNull();
  });

  afterAll(async () => {
    await permissionGroupRepository.delete({});
  })
});