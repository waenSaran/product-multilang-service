import { ApiProperty } from '@nestjs/swagger';
import { Detail } from '../types/detail';
import { CreateProductDto } from 'src/modules/products/dto/create-products.dto';
import { ValidateNested } from 'class-validator';

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

export class CreateProductWithTranslationsDto extends CreateProductDto {
  @ApiProperty({
    description: 'Product name translations',
  })
  @ApiProperty({
    description: 'Product translations',
    default: [
      {
        langCode: 'en',
        name: 'product name',
        description: 'product description',
      },
    ],
    type: [UpsertDetailDto],
  })
  @ValidateNested({ each: true })
  translations: UpsertDetailDto[];
}
