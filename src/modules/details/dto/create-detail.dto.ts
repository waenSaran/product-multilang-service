import { ApiProperty } from '@nestjs/swagger';
import { Detail } from '../types/detail';
import { CreateProductDto } from 'src/modules/products/dto/create-products.dto';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class UpsertDetailDto implements Partial<Detail> {
  @ApiProperty({
    description: 'Product code (uuid)',
  })
  productCode?: string;

  @ApiProperty({
    required: true,
    description: 'Language code (ISO 639-1)',
  })
  langCode: string;

  @ApiProperty({
    description: 'Product name in the specified language',
  })
  name?: string;

  @ApiProperty({
    description: 'Product description in the specified language',
  })
  description?: string;
}

export class CreateProductWithTranslationsDto extends CreateProductDto {
  @ApiProperty({
    required: true,
    description: 'Product name translations',
  })
  @IsNotEmpty()
  baseName: string;

  @ApiProperty({
    required: true,
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
  @IsNotEmpty()
  @ValidateNested({ each: true })
  translations: UpsertDetailDto[];
}
