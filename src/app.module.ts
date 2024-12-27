import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { HealthModule } from './health-check/health.module';
import { CoreModule } from './core/core.module';
import { UuidGeneratorService } from './modules/uuid-generator/uuid-generator.service';
import { DetailsModule } from './modules/details/details.module';
import { LanguagesModule } from './modules/languages/languages.module';

@Module({
  imports: [
    ProductsModule,
    HealthModule,
    CoreModule,
    LanguagesModule,
    DetailsModule,
  ],
  controllers: [],
  providers: [UuidGeneratorService],
})
export class AppModule {}
