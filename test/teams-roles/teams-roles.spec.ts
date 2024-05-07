import { Test, TestingModule } from "@nestjs/testing";
import { TeamsRolesEntity } from "../../lib/entities";
import { TeamsRolesRepository } from "../../lib/repositories";
import databaseTestConfig from "../test-database.config";

describe('Teams-Roles', () => {
  let teamsRolesRepository: TeamsRolesRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule(databaseTestConfig).compile();
    teamsRolesRepository = module.get<TeamsRolesRepository>('TeamsRolesEntityRepository');
  })

  let createTeamsRoles: TeamsRolesEntity;

  // Create a teams-roles
  it('Create a teams-roles', async () => {
    createTeamsRoles = await teamsRolesRepository.save({
      teamId: 1,
      roleId: 1,
    });
    expect(createTeamsRoles).toBeDefined();
  })

  // Update a teams-roles
  it('Update a teams-roles', async () => {
    createTeamsRoles.teamId = 2;
    createTeamsRoles = await teamsRolesRepository.save(createTeamsRoles);
    expect(createTeamsRoles.teamId).toBe(2);
  })

  // // Delete a teams-roles
  // it('Delete a teams-roles', async () => {
  //   const deleteTeamsRoles = await teamsRolesRepository.delete(createTeamsRoles.id);
  //   expect(deleteTeamsRoles.affected).toBe(1);
  // })

  // // Find all teams-roles
  // it('Find all teams-roles', async () => {
  //   const teamsRoles = await teamsRolesRepository.find();
  //   expect(teamsRoles).toBeDefined();
  // })

  // Find one teams-roles
})