import { Test, TestingModule } from "@nestjs/testing";
import { TeamEntity } from "../../lib/entities";
import { TeamRepository } from "../../lib/repositories";
import databaseTestConfig from "../test-database.config";

describe('TeamEntity', () => {

  let teamRepository: TeamRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule(databaseTestConfig).compile();
    teamRepository = module.get<TeamRepository>('TeamEntityRepository');
  });

  let createTeam: TeamEntity;

  // Create a team
  it('should create a team ', async () => {
    createTeam = await teamRepository.save({
      name: 'Test Team',
      code: 'test-team',
    });
    expect(createTeam).toHaveProperty('id');
  });

  // Find a team
  it('should find a team', async () => {
    const foundTeam = await teamRepository.findOne({
      where: {
        id: createTeam.id,
        deletedAt: null,
      },
    });
    expect(foundTeam.id).toBe(createTeam.id);
  });

  // Update a team
  it('should update a team', async () => {
    createTeam.name = 'Updated Team';
    const updatedTeam = await teamRepository.save(createTeam);
    expect(updatedTeam.name).toBe('Updated Team');
  });

  // Soft delete a team
  it('should soft delete a team', async () => {
    await teamRepository.softDelete({
      id: createTeam.id,
    });
    const foundTeam = await teamRepository.findOne({
      where: {
        id: createTeam.id,
        deletedAt: null,
      },
    });
    expect(foundTeam).toBeNull();
  });
})