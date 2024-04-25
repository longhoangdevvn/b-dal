import { Test, TestingModule } from "@nestjs/testing";
import { AppEntity, StoreEntity } from "../../lib/entities";
import { AppRepository, StoreRepository } from "../../lib/repositories";
import databaseTestConfig from "../test-database.config";

describe('AppEntity', () => {
  let appRepository: AppRepository;
  let storeRepository: StoreRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule(databaseTestConfig).compile();
    appRepository = module.get<AppRepository>('AppEntityRepository');
    storeRepository = module.get<StoreRepository>('StoreEntityRepository');
  });

  let createApp: AppEntity;
  let createStore: StoreEntity;

  // Create an app
  it('should create an app ', async () => {
    createStore = await storeRepository.save({
      name: 'Test Store App',
      code: 'test-store-app',
    });
    createApp = await appRepository.save({
      name: 'Test App',
      code: 'test-app',
      storeId: createStore.id,
    });
    expect(createApp).toHaveProperty('id');
  });

  // Find an app
  it('should find an app', async () => {
    const foundApp = await appRepository.findOne({
      where: {
        id: createApp.id,
        deletedAt: null,
      },
    });
    expect(foundApp.id).toBe(createApp.id);
  });

  // Update an app
  it('should update an app', async () => {
    createApp.name = 'Updated App';
    const updatedApp = await appRepository.save(createApp);
    expect(updatedApp.name).toBe('Updated App');
  });

  // Soft delete an app
  it('should soft delete an app', async () => {
    await appRepository.softDelete({
      id: createApp.id,
    });
    const foundApp = await appRepository.findOne({
      where: {
        id: createApp.id,
        deletedAt: null,
      },
    });
    expect(foundApp).toBeNull();
  });

})