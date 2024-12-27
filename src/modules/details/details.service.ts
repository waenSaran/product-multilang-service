import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import {
  CreateProductWithTranslationsDto,
  UpsertDetailDto,
} from './dto/create-detail.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';
import { DETAILS } from 'src/constants/details.constant';
import { ProductDetail } from 'src/core/db/models/product-detail.model';
import { ProductsService } from '../products/products.service';
import { LanguagesService } from '../languages/languages.service';
import { FilterDetailParams } from './dto/find-detail.dto';
import { Op } from 'sequelize';

@Injectable()
export class DetailsService {
  constructor(
    @Inject(DETAILS.REPOSITORY)
    private readonly detailRepository: typeof ProductDetail,
    private readonly productsService: ProductsService,
    private readonly languageService: LanguagesService,
  ) {}

  errorHandling(type: HttpStatus, message: string, error: any) {
    Logger.error(
      JSON.stringify({ type, error }),
      'DetailsService:errorHandling',
    );
    throw new HttpException(
      {
        status: type,
        message,
        error,
      },
      type,
      {
        cause: error,
      },
    );
  }

  async createProductWithTranslations(
    data: CreateProductWithTranslationsDto,
  ): Promise<ProductDetail[]> {
    const context = 'product-service:createWithTranslations';
    Logger.log('Start creating product with translations', context);
    try {
      const productResult = await this.productsService.create(data);
      Logger.log(JSON.stringify(productResult), context);

      const allResult = Promise.allSettled(
        data.translations.map(async (translation) => {
          return await this.upsert({
            productCode: productResult.code,
            langCode: translation.langCode,
            name: translation.name,
            description: translation.description,
          });
        }),
      ).then((res) => {
        let results: ProductDetail[] = [];
        res.forEach((result) => {
          if (result.status === 'rejected') {
            Logger.error(result.reason, context);
            throw new HttpException(result.reason, HttpStatus.BAD_REQUEST);
          }
          results.push(result.value);
          Logger.log(JSON.stringify(result.value), context + ' created detail');
        });
        return results;
      });
      return allResult;
    } catch (error) {
      Logger.error(JSON.stringify(error), context);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async upsert(data: UpsertDetailDto): Promise<ProductDetail> {
    Logger.log(
      JSON.stringify(data),
      'DetailsService:create - Starting upsert detail',
    );
    try {
      const product = await this.productsService.findOne(data.productCode);
      if (!product || !product.code) {
        this.errorHandling(
          HttpStatus.NOT_FOUND,
          'Error finding product: ' + data.productCode,
          product,
        );
      }
      const language = await this.languageService.findOne(data.langCode);
      if (!language || !language.code) {
        this.errorHandling(
          HttpStatus.NOT_FOUND,
          'Error finding language: ' + data.langCode,
          language,
        );
      }
      const result = await this.detailRepository.upsert<ProductDetail>({
        ...data,
      });
      if (!result) {
        this.errorHandling(
          HttpStatus.BAD_REQUEST,
          'Error creating detail',
          result,
        );
      }
      return result[0];
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.errorHandling(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error upserting detail',
        error,
      );
    }
  }

  async findAllWithFilter(query: FilterDetailParams): Promise<ProductDetail[]> {
    Logger.log(
      JSON.stringify(query),
      'DetailsService:findAllWithFilter - Start finding all details',
    );
    try {
      return await this.detailRepository.findAll({
        where: {
          ...query,
          ...(query.name
            ? {
                name: {
                  [Op.iLike]: `%${query.name}%`,
                },
              }
            : {}),
          ...(query.description
            ? {
                description: {
                  [Op.iLike]: `%${query.description}%`,
                },
              }
            : {}),
        },
      });
    } catch (error) {
      this.errorHandling(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error finding all details',
        error,
      );
    }
  }

  async findOne(productCode: string, langCode: string) {
    Logger.log(
      JSON.stringify({ productCode, langCode }),
      'DetailsService:findOne - Start finding detail',
    );
    try {
      const result = await this.detailRepository.findOne<ProductDetail>({
        where: { productCode, langCode },
      });
      if (!result || !result.productCode || !result.langCode) {
        this.errorHandling(
          HttpStatus.NOT_FOUND,
          `Detail with productCode: ${productCode}, langCode: ${langCode} not found`,
          result,
        );
      }
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.errorHandling(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error finding detail',
        error,
      );
    }
  }

  update(id: number, updateDetailDto: UpdateDetailDto) {
    console.log('updateDetailDto', updateDetailDto);
    return `This action updates a #${id} detail`;
  }

  remove(id: number) {
    return `This action removes a #${id} detail`;
  }
}
