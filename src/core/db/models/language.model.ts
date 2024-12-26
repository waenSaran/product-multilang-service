import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'languages',
  timestamps: false,
})
export class Language extends Model {
  @Column({ primaryKey: true })
  code: string;

  @Column({ field: 'lang_name' })
  langName: string;

  @Column({ field: 'local_name' })
  localName: string;
}
