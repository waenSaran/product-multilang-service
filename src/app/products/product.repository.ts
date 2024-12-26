import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ProductsRepository {
  constructor(private sequelize: Sequelize) {}
}
