import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Usuario } from '../usuarios/usuarios.entity';

@Table({
  schema: 'public',
  tableName: 'recuperaciones_contrasena',
})
export class RecuperacionContrasena extends Model<RecuperacionContrasena> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    field: 'id',
  })
  id: number;

  @Column
  fecha_creacion: Date;

  @Column
  fecha_expiracion: Date;

  @Column
  fecha_uso: Date;

  @Column
  codigo_verificacion: string;

  @Column
  usuario_id: number;

  @BelongsTo(() => Usuario, { foreignKey: 'usuario_id', as: 'Usuario' })
  Usuario: Usuario;
}
