import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PRODUCTS } from 'src/constants/product.constant';

jest.mock('src/constants/product.constant', () => ({
  PRODUCTS: {
    REPOSITORY: 'mock-repository',
  },
}));

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const productRepository = {
      findAll: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: PRODUCTS.REPOSITORY, useValue: productRepository },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
