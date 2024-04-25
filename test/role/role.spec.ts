import { Test, TestingModule } from "@nestjs/testing";
import {  RoleEntity } from "../../lib/entities";
import { RoleRepository } from "../../lib/repositories";
import databaseTestConfig from "../test-database.config";

describe('RoleEntity', () => {
  let roleRepository: RoleRepository;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule(databaseTestConfig).compile();
    roleRepository = module.get<RoleRepository>('RoleEntityRepository');
  })

  let createRole: RoleEntity;

  // Create a role
  it('should create a role ', async () => {
    createRole = await roleRepository.save({
      name: 'Test Role',
      code: 'test-role',
    });
    expect(createRole).toHaveProperty('id');
  });

  // Find a role
  it('should find a role', async () => {
    const foundRole = await roleRepository.findOne({
      where: {
        id: createRole.id,
        deletedAt: null,
      },
    });
    expect(foundRole.id).toBe(createRole.id);
  });

  // Update a role
  it('should update a role', async () => {
    createRole.name = 'Updated Role';
    const updatedRole = await roleRepository.save(createRole);
    expect(updatedRole.name).toBe('Updated Role');
  });

  // Soft delete a role
  it('should soft delete a role', async () => {
    await roleRepository.softDelete({
      id: createRole.id,
    });
    const foundRole = await roleRepository.findOne({
      where: {
        id: createRole.id,
        deletedAt: null,
      },
    });
    expect(foundRole).toBeNull();
  });
})