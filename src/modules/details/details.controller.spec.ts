import { Test, TestingModule } from '@nestjs/testing';
import { DetailsController } from './details.controller';
import { DetailsService } from './details.service';
import { productDetailsProviders } from './details.providers';
import { ProductsService } from '../products/products.service';
import { PRODUCTS } from 'src/constants/product.constant';
import { LanguagesService } from '../languages/languages.service';
import { LANGUAGE } from 'src/constants/language.constant';

describe('DetailsController', () => {
  let controller: DetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailsController],
      providers: [
        DetailsService,
        { provide: ProductsService, useValue: PRODUCTS.REPOSITORY },
        { provide: LanguagesService, useValue: LANGUAGE.REPOSITORY },
        ...productDetailsProviders,
      ],
    }).compile();

    controller = module.get<DetailsController>(DetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
