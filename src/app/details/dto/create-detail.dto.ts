import { Detail } from '../types/detail';

export class CreateDetailDto implements Detail {
  productCode: string;
  langCode: string;
  name: string;
  description?: string;
}
