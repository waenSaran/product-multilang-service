import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { HealthModule } from './health-check/health.module';
import { CoreModule } from './core/core.module';
import { GenUuidService } from './modules/gen-uuid/gen-uuid.service';
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
  controllers: [AppController],
  providers: [AppService, GenUuidService],
})
export class AppModule {}
