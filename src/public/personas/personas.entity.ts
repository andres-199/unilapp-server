import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript'
import { Publicacion } from '../publicaciones/publicaciones.entity'
import { Usuario } from '../usuarios/usuarios.entity'

@Table({
	schema: 'public',
	tableName: 'personas',
})

export class Persona extends Model<Persona> {

	@Column({
  	type: DataType.INTEGER,
  	autoIncrement: true,
  	primaryKey: true,
  	unique: true,
  	field: 'id',
	})
	id: number



  @Column
	nombre: string

  @Column
	apellido: string

  @Column
	correo: string

  @Column
	createdAt: Date

  @Column
	updatedAt: Date



  @HasMany(() => Publicacion, { as: 'Publicacion', foreignKey: 'persona_id' })
	Publicacion: Publicacion[]

  @HasMany(() => Usuario, { as: 'Usuario', foreignKey: 'persona_id' })
	Usuario: Usuario[]


}
