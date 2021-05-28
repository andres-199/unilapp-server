import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Publicacion } from '../publicaciones/publicaciones.entity';

@Table({
  schema: 'public',
  tableName: 'tipo_publicaciones',
})
export class TipoPublicacion extends Model<TipoPublicacion> {
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
  descripcion: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Column
  singular: string;

  @HasMany(() => Publicacion, {
    as: 'Publicacion',
    foreignKey: 'tipo_publicacion_id',
  })
  Publicacion: Publicacion[];
}
