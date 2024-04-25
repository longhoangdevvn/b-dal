import { Test, TestingModule } from "@nestjs/testing";
import { PermissionGroupEntity } from "../../lib/entities";
import { PermissionGroupRepository } from "../../lib/repositories";
import databaseTestConfig from "../test-database.config";
describe('PermissionGroupEntity', () => {
  let permissionGroupRepository: PermissionGroupRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule(databaseTestConfig).compile();
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

  // Find a permission group
  it('should find a permission group', async () => {
    // Assuming `createdPermissionGroup` is the permission group created in the previous test
    const foundPermissionGroup = await permissionGroupRepository.findOne({
      where: {
        id: createdPermissionGroup.id,
        deletedAt: null,
      },
    });
    expect(foundPermissionGroup.id).toBe(createdPermissionGroup.id);
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
    // await permissionGroupRepository.delete({});
  })
});