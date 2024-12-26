import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Language extends Model {
  @Column({ primaryKey: true })
  code: string;

  @Column
  langName: string;

  @Column
  localName: string;
}
