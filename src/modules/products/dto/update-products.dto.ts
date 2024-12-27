import { PartialType } from '@nestjs/mapped-types';
import { CreateProductWithTranslationsDto } from './create-products.dto';

export class UpdateProductDto extends PartialType(CreateProductWithTranslationsDto) {}
