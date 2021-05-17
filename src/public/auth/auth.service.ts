import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { Sequelize } from 'sequelize-typescript'
import { FindOptions } from 'sequelize/types'
import { LoginData } from './login-data.interface'

@Injectable()
export class AuthService {
  constructor(@Inject('Sequelize') private sequelize: Sequelize) {}

  async login(userdata: LoginData) {
    const { Usuario } = this.sequelize.models
    const options: FindOptions = {}
    options.where = { usuario: userdata.usuario }
    options.include=[{association:'Tercero',attributes:['restaurante_id']}]
    const user = await Usuario.findOne(options)
    const _user: LoginData = user?.toJSON()

    if (_user && _user.contrasena === userdata.contrasena) {
      const { contrasena, ...result } = _user
      return result
    }
    throw new UnauthorizedException()
  }
}
