import { Table, Model, Column, DataType, BelongsTo } from 'sequelize-typescript'
import { Estado } from '../estados/estados.entity'
import { Facultad } from '../facultades/facultades.entity'
import { Finalidad } from '../finalidades/finalidades.entity'
import { Persona } from '../personas/personas.entity'
import { TipoPublicacion } from '../tipo-publicaciones/tipo-publicaciones.entity'

@Table({
	schema: 'public',
	tableName: 'publicaciones',
})

export class Publicacion extends Model<Publicacion> {

	@Column({
  	type: DataType.INTEGER,
  	autoIncrement: true,
  	primaryKey: true,
  	unique: true,
  	field: 'id',
	})
	id: number



  @Column
	tipo_publicacion_id: number

  @Column
	persona_id: number

  @Column
	nombre: string

  @Column
	descripcion: string

  @Column({ type: DataType.JSON })
	imagenes: JSON

  @Column({ type: DataType.JSON })
	contacto: JSON

  @Column
	estado_id: number

  @Column
	finalidad_id: number

  @Column
	createdAt: Date

  @Column
	updatedAt: Date

  @Column
	facultad_id: number


	@BelongsTo(() => Estado, { foreignKey: 'estado_id', as: 'Estado'})
	Estado: Estado

	@BelongsTo(() => Facultad, { foreignKey: 'facultad_id', as: 'Facultad'})
	Facultad: Facultad

	@BelongsTo(() => Finalidad, { foreignKey: 'finalidad_id', as: 'Finalidad'})
	Finalidad: Finalidad

	@BelongsTo(() => Persona, { foreignKey: 'persona_id', as: 'Persona'})
	Persona: Persona

	@BelongsTo(() => TipoPublicacion, { foreignKey: 'tipo_publicacion_id', as: 'TipoPublicacion'})
	TipoPublicacion: TipoPublicacion



}
