import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { languagesProviders } from './languages.providers';

@Module({
  controllers: [LanguagesController],
  providers: [LanguagesService, ...languagesProviders],
  exports: [LanguagesService],
})
export class LanguagesModule {}
