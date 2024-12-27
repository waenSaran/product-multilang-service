import { CreateDetailDto } from 'src/modules/details/dto/create-detail.dto';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Product } from '../types/product';

export class CreateProductDto implements Partial<Product> {
  @IsNotEmpty()
  baseName: string;
}
export class CreateProductWithTranslationsDto {
  @IsNotEmpty()
  baseName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDetailDto)
  translations: CreateDetailDto[];
}
