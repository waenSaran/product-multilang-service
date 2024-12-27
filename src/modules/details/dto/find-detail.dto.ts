import { IsNotEmpty, IsString } from 'class-validator';

export class FindDetailParams {
  @IsNotEmpty()
  @IsString()
  productCode: string;

  @IsNotEmpty()
  @IsString()
  langCode: string;
}
