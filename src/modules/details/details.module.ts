import { Module } from '@nestjs/common';
import { DetailsService } from './details.service';
import { DetailsController } from './details.controller';
import { productDetailsProviders } from './details.providers';
import { ProductsModule } from '../products/products.module';
import { LanguagesModule } from '../languages/languages.module';

@Module({
  imports: [ProductsModule, LanguagesModule],
  controllers: [DetailsController],
  providers: [DetailsService, ...productDetailsProviders],
})
export class DetailsModule {}
