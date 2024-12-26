import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'products',
  timestamps: false,
})
export class Product extends Model {
  @Column({ primaryKey: true })
  code: string;

  @Column
  baseName: string;
}
