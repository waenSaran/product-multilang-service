import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { UuidGeneratorService } from '../uuid-generator/uuid-generator.service';
import { productsProviders } from './products.providers';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, UuidGeneratorService, ...productsProviders],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
