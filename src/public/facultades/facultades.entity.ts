import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Publicacion } from '../publicaciones/publicaciones.entity';

@Table({
  schema: 'public',
  tableName: 'facultades',
})
export class Facultad extends Model<Facultad> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    field: 'id',
  })
  id: number;

  @Column
  nombre: string;

  @Column
  descripción: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Column
  imagen: string;

  @HasMany(() => Publicacion, { as: 'Publicacion', foreignKey: 'facultad_id' })
  Publicacion: Publicacion[];
}
