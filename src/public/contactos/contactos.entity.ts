import { Table, Model, Column, DataType } from 'sequelize-typescript'

@Table({
	schema: 'public',
	tableName: 'contactos',
})

export class Contacto extends Model<Contacto> {

	@Column({
  	type: DataType.INTEGER,
  	autoIncrement: true,
  	primaryKey: true,
  	unique: true,
  	field: 'id',
	})
	id: number



  @Column
	email: string

  @Column
	number: string

  @Column
	call: string

  @Column
	whatsapp: string

  @Column
	createdAt: Date

  @Column
	updatedAt: Date




}
