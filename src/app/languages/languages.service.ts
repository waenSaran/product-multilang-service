import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';

@Injectable()
export class LanguagesService {
  create(createLanguageDto: CreateLanguageDto) {
    console.log('createLanguageDto', createLanguageDto);
    return 'This action adds a new language';
  }

  findAll() {
    return `This action returns all languages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} language`;
  }

  update(id: number, updateLanguageDto: UpdateLanguageDto) {
    console.log('updateLanguageDto', updateLanguageDto);
    return `This action updates a #${id} language`;
  }

  remove(id: number) {
    return `This action removes a #${id} language`;
  }
}
