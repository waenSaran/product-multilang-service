import { PRODUCTS } from 'src/constants/product.constant';
import { Product } from 'src/core/db/models/product.model';

export const productsProviders = [
  {
    provide: PRODUCTS.REPOSITORY,
    useValue: Product,
  },
];
