import { IsNotEmpty } from 'class-validator';
import { Product } from '../types/product';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto implements Partial<Product> {
  @ApiProperty({
    description: 'Product name',
  })
  @IsNotEmpty()
  baseName: string;
}
