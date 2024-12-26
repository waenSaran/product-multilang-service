import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';

export const dbProviders = registerAs('db', () => ({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
}));

@Injectable()
export class DBConfigService {
  constructor(private readonly configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('db.host');
  }

  get port(): number {
    return this.configService.get<number>('db.port');
  }

  get username(): string {
    return this.configService.get<string>('db.username');
  }

  get password(): string {
    return this.configService.get<string>('db.password');
  }
}
