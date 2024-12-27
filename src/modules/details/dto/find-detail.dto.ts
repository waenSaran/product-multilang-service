import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
    required: false
  })
  description: string;
}