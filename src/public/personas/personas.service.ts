import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CreateOptions, FindOptions } from 'sequelize/types';
import { ErrorResponse } from 'src/interfaces/error-response.interface';
import { _Response } from 'src/interfaces/response.interface';
import { Persona } from './persona.interface';

@Injectable()
export class PersonasService {
  constructor(@Inject('Sequelize') private sequelize: Sequelize) {}

  create(data: Persona) {
    const { Persona } = this.sequelize.models;
    const options: CreateOptions = {};
    options.include = ['Usuario'];

    return Persona.create(data, options)
      .then(this.composeCreateResponse)
      .catch(e => {
        const error: ErrorResponse = {};
        error.message =
          'Lo sentimos algo salio mal 🙄, verifica los datos, quisaz ya tengas una cuenta con el correo ingresado.';
        throw new HttpException(error, 500);
      });
  }

  private composeCreateResponse(data) {
    const response: _Response = {};
    response.data = data;
    response.message =
      'Te has registrado en UNILAPP ✔, ingresa con tu correo y contraseña y consulta las publicaciones de la comunidad.';
    return response;
  }

  getPublicaciones(personaId: number) {
    const { Persona } = this.sequelize.models;
    const options: FindOptions = {};
    options.include = [
      {
        association: 'Publicaciones',
        include: ['TipoPublicacion', 'Finalidad', 'Estado'],
      },
    ];
    return Persona.findByPk(personaId, options).then(persona => {
      const response = {};
      persona = persona.toJSON() as any;
      for (const publicacion of persona['Publicaciones']) {
        if (response[publicacion.TipoPublicacion.nombre])
          response[publicacion.TipoPublicacion.nombre].push(publicacion);
        else response[publicacion.TipoPublicacion.nombre] = [publicacion];
      }

      return response;
    });
  }
}
