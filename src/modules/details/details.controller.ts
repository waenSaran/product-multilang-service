import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DetailsService } from './details.service';
import { CreateProductWithTranslationsDto } from './dto/create-detail.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';
import { FilterDetailParams, FindDetailParams } from './dto/find-detail.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Translations')
@Controller('translations')
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {}

  @Post()
  createProductWithTranslations(
    @Body() payload: CreateProductWithTranslationsDto,
  ) {
    return this.detailsService.createProductWithTranslations(payload);
  }

  @Get()
  findAllWithFilter(@Query() query:FilterDetailParams) {
    return this.detailsService.findAllWithFilter(query);
  }

  @Get(':langCode/:productCode')
  findOne(@Param() params: FindDetailParams) {
    const { langCode, productCode } = params;
    return this.detailsService.findOne(productCode, langCode);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetailDto: UpdateDetailDto) {
    return this.detailsService.update(+id, updateDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailsService.remove(+id);
  }
}
