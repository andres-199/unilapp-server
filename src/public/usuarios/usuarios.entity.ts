import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { RecuperacionContrasena } from '../recuperaciones-contrasena/recuperaciones-contrasena.entity';
import { Persona } from '../personas/personas.entity';

@Table({
  schema: 'public',
  tableName: 'usuarios',
})
export class Usuario extends Model<Usuario> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    field: 'id',
  })
  id: number;

  @Column
  usuario: string;

  @Column
  contrasena: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Column
  persona_id: number;

  @BelongsTo(() => Persona, { foreignKey: 'persona_id', as: 'Persona' })
  Persona: Persona;

  @HasMany(() => RecuperacionContrasena, {
    as: 'RecuperacionContrasena',
    foreignKey: 'usuario_id',
  })
  RecuperacionContrasena: RecuperacionContrasena[];
}
