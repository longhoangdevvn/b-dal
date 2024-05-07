import { Test, TestingModule} from "@nestjs/testing";
import { CurrencyRateEntity } from "../../lib/entities";
import { CurrencyRateRepository } from "../../lib/repositories";

import databaseTestConfig from "../test-database.config";

describe('CurrencyRateEntity', () => {
  let currencyRateRepository: CurrencyRateRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule(databaseTestConfig).compile();
    currencyRateRepository = module.get<CurrencyRateRepository>('CurrencyRateEntityRepository');
  });

  let createCurrencyRate: CurrencyRateEntity;

  // Create a currency rate
  it('should create a currency rate', async () => {
    createCurrencyRate = await currencyRateRepository.save({
      fromCurrencyCode: 'USD',
      toCurrencyCode: 'EUR',
      rate: 1.02,
      applyTime: new Date(),
    });
    expect(createCurrencyRate).toHaveProperty('id');
  });

  // Find a currency rate
  it('should find a currency rate', async () => {
    const foundCurrencyRate = await currencyRateRepository.findOne({
      where: {
        id: createCurrencyRate.id,
        deletedAt: null,
      },
    });
    expect(foundCurrencyRate.id).toBe(createCurrencyRate.id);
  });

  // Update a currency rate
  it('should update a currency rate', async () => {
    createCurrencyRate.rate = 1.03;
    const updatedCurrencyRate = await currencyRateRepository.save(createCurrencyRate);
    expect(updatedCurrencyRate.rate).toBe(1.03);
  });

  // Soft delete a currency rate
  it('should soft delete a currency rate', async () => {
    await currencyRateRepository.softDelete({
      id: createCurrencyRate.id,
    });
    const foundCurrencyRate = await currencyRateRepository.findOne({
      where: {
        id: createCurrencyRate.id,
        deletedAt: null,
      },
    });
    expect(foundCurrencyRate).toBeNull();
  });

});
