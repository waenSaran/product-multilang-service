import { Test, TestingModule } from '@nestjs/testing';
import { DetailsService } from './details.service';
import { ProductDetail } from 'src/core/db/models/product-detail.model';
import { ProductsModule } from '../products/products.module';
import { LanguagesModule } from '../languages/languages.module';
import { DETAILS } from 'src/constants/details.constant';
import { Op } from 'sequelize';

const mockSuccessResult = {
  page: 0,
  limit: 10,
  total: 1,
  data: [
    {
      productCode: 'mock-product-code',
      langCode: 'mock-lang-code',
      name: 'mock-name',
      description: 'mock-description',
    },
  ],
};

describe('DetailsService', () => {
  let service: DetailsService;
  let mockDetailRepository: jest.Mocked<typeof ProductDetail>;
  // let mockProductsService: Partial<ProductsService>;
  // let mockLanguagesService: Partial<LanguagesService>;

  beforeEach(async () => {
    mockDetailRepository = {
      findAndCountAll: jest.fn(),
    } as unknown as jest.Mocked<typeof ProductDetail>;
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProductsModule, LanguagesModule],
      providers: [
        DetailsService,
        {
          provide: DETAILS.REPOSITORY,
          useValue: mockDetailRepository,
        },
      ],
    }).compile();

    service = module.get<DetailsService>(DetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get without any filter', async () => {
    const mockQuery = {};
    const mockData = mockSuccessResult.data;
    mockDetailRepository.findAndCountAll = jest.fn().mockResolvedValue({
      count: mockData.length,
      rows: mockData,
    });
    const details = await service.findAllWithFilter(mockQuery);

    expect(mockDetailRepository.findAndCountAll).toHaveBeenCalledWith({
      where: {},
      limit: 10,
      offset: 0,
      order: [
        ['langCode', 'ASC'],
        ['name', 'ASC'],
      ],
    });
    expect(details).toEqual(mockSuccessResult);
  });

  it('should get with filter', async () => {
    const mockQuery = {
      name: 'mock-product-name',
      langCode: 'mock-lang-code',
    };
    const mockData = mockSuccessResult.data;
    mockDetailRepository.findAndCountAll = jest.fn().mockResolvedValue({
      count: mockData.length,
      rows: mockData,
    });
    const details = await service.findAllWithFilter(mockQuery);
    expect(mockDetailRepository.findAndCountAll).toHaveBeenCalledWith({
      where: {
        name: {
          [Op.iLike]: `%${mockQuery.name}%`,
        },
        langCode: mockQuery.langCode,
      },
      limit: 10,
      offset: 0,
      order: [
        ['langCode', 'ASC'],
        ['name', 'ASC'],
      ],
    });
    expect(details).toEqual(mockSuccessResult);
  });

  it('should get empty array when no data found', async () => {
    const mockQuery = {
      name: 'mock-product-name',
      langCode: 'mock-lang-code',
    };
    mockDetailRepository.findAndCountAll = jest.fn().mockResolvedValue({
      count: 0,
      rows: [],
    });
    const details = await service.findAllWithFilter(mockQuery);
    expect(mockDetailRepository.findAndCountAll).toHaveBeenCalledWith({
      where: {
        name: {
          [Op.iLike]: `%${mockQuery.name}%`,
        },
        langCode: mockQuery.langCode,
      },
      limit: 10,
      offset: 0,
      order: [
        ['langCode', 'ASC'],
        ['name', 'ASC'],
      ],
    });
    expect(details).toEqual({
      page: 0,
      limit: 10,
      total: 0,
      data: [],
    });
  });

  it('should get empty array when exceeding the limit page', async () => {
    const mockQuery = {
      p: 1,
      l: 10,
    };
    mockDetailRepository.findAndCountAll = jest.fn().mockResolvedValue({
      count: 0,
      rows: [],
    });
    const details = await service.findAllWithFilter(mockQuery);
    expect(mockDetailRepository.findAndCountAll).toHaveBeenCalledWith({
      where: {},
      limit: 10,
      offset: 10,
      order: [
        ['langCode', 'ASC'],
        ['name', 'ASC'],
      ],
    });
    expect(details).toEqual({
      page: 1,
      limit: 10,
      total: 0,
      data: [],
    });
  });
});
