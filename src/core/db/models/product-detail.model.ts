import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Product } from './product.model';
import { Language } from './language.model';

@Table({
  tableName: 'details',
  timestamps: false,
})
export class ProductDetail extends Model {
  @ForeignKey(() => Product)
  @Column({ primaryKey: true, field: 'product_code' })
  productCode: string;

  @ForeignKey(() => Language)
  @Column({ primaryKey: true, field: 'lang_code' })
  langCode: string;

  @Column
  name: string;

  @Column
  description: string;
}
