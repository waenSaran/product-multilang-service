import { Sequelize } from 'sequelize-typescript';
import { Product } from 'src/core/db/models/product.model';
import { Language } from './models/language.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT as unknown as number,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      sequelize.addModels([Product, Language]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
