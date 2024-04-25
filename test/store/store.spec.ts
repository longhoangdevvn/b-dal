import { Test, TestingModule } from "@nestjs/testing";
import { StoreEntity } from "../../lib/entities";
import { StoreRepository } from "../../lib/repositories";
import databaseTestConfig from "../test-database.config";

describe('StoreEntity', () => {
  let storeRepository: StoreRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule(databaseTestConfig).compile();
    storeRepository = module.get<StoreRepository>('StoreEntityRepository');
  })

  let createStore: StoreEntity;

  // Create a store
  it('should create a store ', async () => {
    createStore = await storeRepository.save({
      name: 'Test Store',
      code: 'test-store',
    });
    expect(createStore).toHaveProperty('id');
  });

  // Find a store
  it('should find a store', async () => {
    const foundStore = await storeRepository.findOne({
      where: {
        id: createStore.id,
        deletedAt: null,
      },
    });
    expect(foundStore.id).toBe(createStore.id);
  });

  // Update a store
  it('should update a store', async () => {
    createStore.name = 'Updated Store';
    const updatedStore = await storeRepository.save(createStore);
    expect(updatedStore.name).toBe('Updated Store');
  });

  // Soft delete a store
  it('should soft delete a store', async () => {
    await storeRepository.softDelete({
      id: createStore.id,
    });
    const foundStore = await storeRepository.findOne({
      where: {
        id: createStore.id,
        deletedAt: null,
      },
    });
    expect(foundStore).toBeNull();
  });
});