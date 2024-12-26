import { CreateDetailDto } from 'src/app/details/dto/create-detail.dto';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  baseName: string;

  @IsArray({ each: true })
  @ValidateNested({ each: true })
  @Type(() => CreateDetailDto)
  translations: CreateDetailDto[];
}
