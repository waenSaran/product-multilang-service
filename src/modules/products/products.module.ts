import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { productsProviders } from './products.providers';
import { UuidGeneratorService } from '../uuid-generator/uuid-generator.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, UuidGeneratorService, ...productsProviders],
  exports: [ProductsService],
})
export class ProductsModule {}
