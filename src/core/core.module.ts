import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DbModule } from './db/db.module';
import { LoggerService } from './logger/logger.service';

@Module({
  imports: [ConfigModule, DbModule],
  exports: [ConfigModule, DbModule],
  providers: [LoggerService],
})
export class CoreModule {}
