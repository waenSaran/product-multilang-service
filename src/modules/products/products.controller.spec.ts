import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PRODUCTS } from 'src/constants/product.constant';

jest.mock('src/constants/product.constant', () => ({
  PRODUCTS: {
    REPOSITORY: 'mock-repository',
  },
}));

describe('ProductsController', () => {
  let controller: ProductsController;
  const mockProductService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        { provide: PRODUCTS.REPOSITORY, useValue: mockProductService },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
