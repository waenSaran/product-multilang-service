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
import { Detail } from './types/detail';
import { Pagination } from './types/pagination';

@Injectable()
export class DetailsService {
  constructor(
    @Inject(DETAILS.REPOSITORY)
    private readonly detailRepository: typeof ProductDetail,
    private readonly productsService: ProductsService,
    private readonly languageService: LanguagesService,
  ) {}

  errorHandling(code: HttpStatus, message: string, error: any) {
    Logger.error(
      JSON.stringify({ type: code, error }),
      'DetailsService:errorHandling',
    );
    throw new HttpException(
      {
        status: code,
        message,
        error,
      },
      code,
      {
        cause: error,
      },
    );
  }

  async createProductWithTranslations(
    data: CreateProductWithTranslationsDto,
  ): Promise<{ results: ProductDetail[]; failures: any[] }> {
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
        const results: ProductDetail[] = [];
        const failures: any[] = [];
        res.forEach((result) => {
          if (result.status === 'rejected') {
            failures.push({ error: result.reason });
          } else {
            results.push(result.value);
            Logger.log(
              JSON.stringify(result.value),
              context + ' created detail',
            );
          }
        });
        return {
          results,
          failures,
        };
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
      const existingTranslation = await this.detailRepository.findOne({
        where: {
          productCode: data.productCode,
          langCode: data.langCode,
        },
      });
      if (existingTranslation) {
        this.errorHandling(
          HttpStatus.CONFLICT,
          `Translation for product: ${data.productCode} and language: ${data.langCode} already exists, Please update instead`,
          existingTranslation,
        );
      }
      const result = await this.detailRepository.create<ProductDetail>({
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

  async findAllWithFilter(
    query: FilterDetailParams,
  ): Promise<Pagination<Detail>> {
    Logger.log(
      JSON.stringify(query),
      'DetailsService:findAllWithFilter - Start finding all details',
    );
    try {
      const offset = Number(query.p) * Number(query.l) || 0;
      const limit = Number(query.l) || 10;
      const filter = {
        langCode: query.langCode,
        name: query.name,
        description: query.desc,
      };
      const result = await this.detailRepository.findAndCountAll({
        where: {
          ...(filter.langCode && { langCode: filter.langCode }),
          ...(filter.name && { name: { [Op.iLike]: `%${filter.name}%` } }),
          ...(filter.description && {
            description: { [Op.iLike]: `%${filter.description}%` },
          }),
        },
        limit,
        offset,
        order: [
          ['langCode', 'ASC'],
          ['name', 'ASC'],
        ],
      });
      return {
        page: Number(query.p) || 0,
        limit,
        total: result.count,
        data: result.rows,
      };
    } catch (error) {
      Logger.error(JSON.stringify(error), 'DetailsService:findAllWithFilter');
      return {
        page: 0,
        limit: 10,
        total: 0,
        data: [],
      };
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
