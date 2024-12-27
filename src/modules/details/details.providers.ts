import { DETAILS } from 'src/constants/details.constant';
import { Translation } from 'src/core/db/models/product-detail.model';

export const productDetailsProviders = [
  {
    provide: DETAILS.REPOSITORY,
    useValue: Translation,
  },
];
