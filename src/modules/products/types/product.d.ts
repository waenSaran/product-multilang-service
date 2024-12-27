import { Detail } from 'src/modules/details/types/detail';

export interface Product {
  code: string;
  baseName: string;
}

export interface ProductWithTranslation {
  code: string;
  baseName: string;
  translations: Detail[];
}
