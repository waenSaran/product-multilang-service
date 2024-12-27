import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class FindDetailParams {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productCode: string;

  @ApiProperty({
    default: 'en'
  })
  @IsNotEmpty()
  @IsString()
  langCode: string;
}

export class FilterDetailParams {
  @ApiProperty({
    default: 'en',
    required: false
  })
  langCode: string;

  @ApiProperty({
    required: false
  })
  name: string;

  @ApiProperty({
    description: 'Product description',
    required: false
  })
  desc: string;

  @ApiProperty({
    description: 'Page number',
    required: false,
    default: 0
  })
  @IsNumberString()
  p: string;

  @ApiProperty({
    description: 'Number of items per page',
    required: false,
    default: 10
  })
  @IsNumberString()
  l: string;
}