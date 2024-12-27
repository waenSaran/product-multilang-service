import { ApiProperty } from '@nestjs/swagger';
import { Detail } from '../types/detail';

export class UpsertDetailDto implements Detail {
  @ApiProperty({
    description: 'Product code (uuid)',
  })
  productCode: string;

  @ApiProperty({
    description: 'Language code (ISO 639-1)',
  })
  langCode: string;

  @ApiProperty({
    description: 'Product name in the specified language',
  })
  name: string;

  @ApiProperty({
    description: 'Product description in the specified language',
  })
  description?: string;
}
