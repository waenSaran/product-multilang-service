import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { LANGUAGE } from 'src/constants/language.constant';
import { Language } from 'src/core/db/models/language.model';

@Injectable()
export class LanguagesService {
  constructor(
    @Inject(LANGUAGE.REPOSITORY)
    private readonly languageRepository: typeof Language,
  ) {}
  async upsert(data: CreateLanguageDto) {
    try {
      Logger.log(
        JSON.stringify(data),
        'LanguagesService:create - Start upsert language',
      );
      const result = await this.languageRepository.upsert<Language>({
        ...data,
      });
      if (!result || !result[0].code) {
        Logger.error(JSON.stringify(result), 'LanguagesService:create');
        throw new InternalServerErrorException(
          result,
          'Error upserting language',
        );
      }
      return result[0];
    } catch (error) {
      Logger.error(JSON.stringify(error), 'LanguagesService:create');
      throw new InternalServerErrorException(error, 'Error upserting language');
    }
  }

  findAll() {
    return `This action returns all languages`;
  }

  async findOne(id: string) {
    try {
      Logger.log(`Start find language: ${id}`, 'LanguagesService:findOne');
      const result = await this.languageRepository.findOne<Language>({
        where: { code: id },
      });
      if (!result || !result.code) {
        Logger.error(
          JSON.stringify({ result: result }),
          'LanguagesService:findOne',
        );
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: `Language ${id} not found`,
            error: result,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      Logger.error(JSON.stringify(error), 'LanguagesService:findOne');
      throw new InternalServerErrorException(error, 'Error finding language');
    }
  }

  update(id: number, updateLanguageDto: UpdateLanguageDto) {
    console.log('updateLanguageDto', updateLanguageDto);
    return `This action updates a #${id} language`;
  }

  remove(id: number) {
    return `This action removes a #${id} language`;
  }
}
