import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DetailsService } from './details.service';
import { UpsertDetailDto } from './dto/create-detail.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';
import { FindDetailParams } from './dto/find-detail.dto';

@Controller('details')
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {}

  @Post()
  upsert(@Body() payload: UpsertDetailDto) {
    return this.detailsService.upsert(payload);
  }

  @Get()
  findAll() {
    return this.detailsService.findAll();
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
