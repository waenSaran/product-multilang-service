import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Product } from './product.model';
import { Language } from './language.model';

@Table
export class ProductDetail extends Model {
  @ForeignKey(() => Product)
  @Column
  productCode: string;

  @ForeignKey(() => Language)
  @Column
  langCode: string;

  @Column
  name: string;

  @Column
  description: string;
}
