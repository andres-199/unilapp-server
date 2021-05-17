import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript'
import { Publicacion } from '../publicaciones/publicaciones.entity'

@Table({
	schema: 'public',
	tableName: 'finalidades',
})

export class Finalidad extends Model<Finalidad> {

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
	createdAt: Date

  @Column
	updatedAt: Date



  @HasMany(() => Publicacion, { as: 'Publicacion', foreignKey: 'finalidad_id' })
	Publicacion: Publicacion[]


}
