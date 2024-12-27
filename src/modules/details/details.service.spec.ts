import { Test, TestingModule } from '@nestjs/testing';
import { DetailsService } from './details.service';
import { productDetailsProviders } from './details.providers';
import { ProductsService } from '../products/products.service';
import { PRODUCTS } from 'src/constants/product.constant';
import { LanguagesService } from '../languages/languages.service';
import { LANGUAGE } from 'src/constants/language.constant';

describe('DetailsService', () => {
  let service: DetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DetailsService,
        ...productDetailsProviders,
        {
          provide: ProductsService,
          useValue: PRODUCTS.REPOSITORY,
        },
        {
          provide: LanguagesService,
          useValue: LANGUAGE.REPOSITORY,
        },
      ],
    }).compile();

    service = module.get<DetailsService>(DetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
