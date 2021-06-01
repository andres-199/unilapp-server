import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { FindOptions } from 'sequelize/types';

@Injectable()
export class FacultadesService {
  constructor(@Inject('Sequelize') private sequelize: Sequelize) {}

  getFacultad(facultadId: number) {
    const { Facultad } = this.sequelize.models;
    const options: FindOptions = {};
    options.include = [
      {
        association: 'Publicaciones',
        include: ['TipoPublicacion', 'Finalidad', 'Estado'],
      },
    ];
    return Facultad.findByPk(facultadId, options).then(facultad => {
      facultad = facultad.toJSON() as any;
      for (const publicacion of facultad['Publicaciones']) {
        if (facultad[publicacion.TipoPublicacion.nombre])
          facultad[publicacion.TipoPublicacion.nombre].push(publicacion);
        else facultad[publicacion.TipoPublicacion.nombre] = [publicacion];
      }
      delete facultad['Publicaciones'];
      return facultad;
    });
  }
}
