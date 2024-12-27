import { Test, TestingModule } from '@nestjs/testing';
import { DetailsService } from './details.service';
import { Translation } from 'src/core/db/models/product-detail.model';
import { ProductsModule } from '../products/products.module';
import { LanguagesModule } from '../languages/languages.module';
import { DETAILS } from 'src/constants/details.constant';
import { Op } from 'sequelize';
import { ProductsService } from '../products/products.service';
import { LanguagesService } from '../languages/languages.service';
import { CreateProductWithTranslationsDto } from './dto/create-detail.dto';
import { Product } from 'src/core/db/models/product.model';
import { Language } from 'src/core/db/models/language.model';

const mockSuccess_filterResult = {
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

const mockSuccess_payload: CreateProductWithTranslationsDto = {
  baseName: 'Product1',
  translations: [
    {
      langCode: 'en',
      name: 'Product1 EN',
      description: 'Description EN',
    },
    {
      langCode: 'fr',
      name: 'Product1_FR',
      description: 'Description FR',
    },
  ],
};

const mockSuccess_createdProduct = {
  code: 'mock-uuid',
  baseName: 'mock-product-base-name',
} as Product;

const mockSuccess_createdLanguage = {
  code: 'mock-lang-code',
  langName: 'mock-lang-name',
  localName: 'mock-local-name',
} as Language;

const mockSuccess_createdTranslations = {
  productCode: 'mock-uuid',
  langCode: 'mock-lang-code',
  name: 'mock-name',
  description: 'mock-description',
} as Translation;

describe('findAllWithFilter', () => {
  let service: DetailsService;
  let mockDetailRepository: jest.Mocked<typeof Translation>;

  beforeEach(async () => {
    mockDetailRepository = {
      findAndCountAll: jest.fn(),
    } as unknown as jest.Mocked<typeof Translation>;
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
    const mockData = mockSuccess_filterResult.data;
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
    expect(details).toEqual(mockSuccess_filterResult);
  });

  it('should get with filter', async () => {
    const mockQuery = {
      name: 'mock-product-name',
      langCode: 'mock-lang-code',
    };
    const mockData = mockSuccess_filterResult.data;
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
    expect(details).toEqual(mockSuccess_filterResult);
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

describe('createProductWithTranslations', () => {
  let service: DetailsService;
  let productsService: jest.Mocked<ProductsService>;
  let languageService: jest.Mocked<LanguagesService>;
  let mockDetailRepository: jest.Mocked<typeof Translation>;

  beforeEach(async () => {
    mockDetailRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
    } as unknown as jest.Mocked<typeof Translation>;

    productsService = {
      create: jest.fn(),
      findOne: jest.fn(),
    } as unknown as jest.Mocked<ProductsService>;

    languageService = {
      findOne: jest.fn(),
    } as unknown as jest.Mocked<LanguagesService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DetailsService,
        {
          provide: DETAILS.REPOSITORY,
          useValue: mockDetailRepository,
        },
        {
          provide: ProductsService,
          useValue: productsService,
        },
        {
          provide: LanguagesService,
          useValue: languageService,
        },
      ],
    }).compile();

    service = module.get<DetailsService>(DetailsService);
  });

  it('should create product with translations successfully', async () => {
    productsService.create.mockResolvedValue(mockSuccess_createdProduct);
    productsService.findOne.mockResolvedValue(mockSuccess_createdProduct);
    languageService.findOne.mockResolvedValue(mockSuccess_createdLanguage);
    mockDetailRepository.create.mockResolvedValue(
      mockSuccess_createdTranslations,
    );

    const result =
      await service.createProductWithTranslations(mockSuccess_payload);

    expect(productsService.create).toHaveBeenCalledWith({
      baseName: mockSuccess_payload.baseName,
    });
    expect(mockDetailRepository.create).toHaveBeenCalledTimes(2); // Two translations
    expect(result).toEqual({
      productCode: mockSuccess_createdProduct.code,
      productBaseName: mockSuccess_createdProduct.baseName,
      total: 2,
      success: 2,
      failures: 0,
      errors: [],
    });
  });

  it('should handle errors when creating duplicate translations', async () => {
    const mockData: CreateProductWithTranslationsDto = {
      baseName: mockSuccess_payload.baseName,
      translations: [
        mockSuccess_payload.translations[0],
        mockSuccess_payload.translations[0],
        mockSuccess_payload.translations[0],
      ],
    };
    const mockError = 'Duplicate translations';
    productsService.create.mockResolvedValue(mockSuccess_createdProduct);
    productsService.findOne.mockResolvedValue(mockSuccess_createdProduct);
    languageService.findOne.mockResolvedValue(mockSuccess_createdLanguage);
    mockDetailRepository.create.mockRejectedValue(mockError);
    mockDetailRepository.create.mockResolvedValueOnce(
      mockSuccess_createdTranslations,
    );

    const result = await service.createProductWithTranslations(mockData);

    expect(productsService.create).toHaveBeenCalledWith({
      baseName: mockSuccess_payload.baseName,
    });
    expect(languageService.findOne).toHaveBeenCalledWith(
      mockSuccess_payload.translations[0].langCode,
    );
    expect(result).toEqual({
      productCode: mockSuccess_createdProduct.code,
      productBaseName: mockSuccess_createdProduct.baseName,
      total: 3,
      success: 1,
      failures: 2,
      errors: [{ error: mockError }, { error: mockError }],
    });
    expect(mockDetailRepository.create).toHaveBeenCalledTimes(3);
  });

  it('should handle errors when creating product with not found language', async () => {
    productsService.create.mockResolvedValue(mockSuccess_createdProduct);
    productsService.findOne.mockResolvedValue(mockSuccess_createdProduct);
    const mockError = 'Language not found';
    languageService.findOne.mockRejectedValue(mockError);

    const result = await service.createProductWithTranslations({
      baseName: mockSuccess_payload.baseName,
      translations: [mockSuccess_payload.translations[0]],
    });

    expect(productsService.create).toHaveBeenCalledWith({
      baseName: mockSuccess_payload.baseName,
    });
    expect(languageService.findOne).toHaveBeenCalledWith(
      mockSuccess_payload.translations[0].langCode,
    );
    expect(mockDetailRepository.create).not.toHaveBeenCalled();
    expect(result).toEqual({
      productCode: mockSuccess_createdProduct.code,
      productBaseName: mockSuccess_createdProduct.baseName,
      total: 1,
      success: 0,
      failures: 1,
      errors: [{ error: mockError }],
    });
  });
});
