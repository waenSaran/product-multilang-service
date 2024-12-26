import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { PRODUCTS } from 'src/constants/product.constant';
import { Product } from 'src/core/db/models/product.model';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCTS.REPOSITORY)
    private readonly productRepository: typeof Product,
  ) {}
  async create(data: CreateProductDto): Promise<Product> {
    try {
      const product = {
        code: 'mock-uuid',
        baseName: data.baseName,
      };
      const result = await this.productRepository.create<Product>({
        ...product,
      });
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return error;
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

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    console.log(updateProductDto);
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
