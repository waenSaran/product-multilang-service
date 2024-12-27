import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Product } from './product.model';
import { Language } from './language.model';

@Table({
  tableName: 'translations',
  timestamps: false,
})
export class Translation extends Model {
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
