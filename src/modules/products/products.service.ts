import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { PRODUCTS } from 'src/constants/product.constant';
import { Product } from 'src/core/db/models/product.model';
import { UuidGeneratorService } from '../uuid-generator/uuid-generator.service';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCTS.REPOSITORY)
    private readonly productRepository: typeof Product,
    private readonly uuidGenerator: UuidGeneratorService,
  ) {}

  async create(data: CreateProductDto): Promise<Product> {
    Logger.log(
      JSON.stringify(data),
      'product-service:create - Creating product',
    );
    try {
      const product = {
        code: this.uuidGenerator.generate(),
        baseName: data.baseName,
      };
      const result = await this.productRepository.create<Product>({
        ...product,
      });
      if (!result || !result.code) {
        Logger.error(JSON.stringify(result), 'product-service:create');
        throw new BadRequestException(result, 'Error creating product');
      }
      return result;
    } catch (error) {
      Logger.error(JSON.stringify(error), 'product-service:create');
      throw new InternalServerErrorException(error, 'Error creating product');
    }
  }

  findAll() {
    try {
      return this.productRepository.findAll();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findOne(id: string) {
    try {
      Logger.log(
        `Start finding product code: ${id}`,
        'product-service:findOne',
      );
      const result = await this.productRepository.findOne<Product>({
        where: { code: id },
      });
      if (!result || !result.code) {
        Logger.error(result, 'product-service:findOne');
        throw new NotFoundException(result, `Product ${id} not found`);
      }
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      Logger.error(error, 'product-service:findOne');
      throw new HttpException(error, 500);
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    console.log(updateProductDto);
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
