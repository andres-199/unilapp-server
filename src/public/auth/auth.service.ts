import { HttpException, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { Sequelize } from 'sequelize-typescript'
import { FindOptions } from 'sequelize/types'
import { Persona } from '../personas/persona.interface'
import { RecuperacionContrasena } from '../recuperaciones-contrasena/recuperacion-contrasena.interface'
import { LoginData } from './login-data.interface'
import * as sequelize from 'sequelize'
import * as nodemailer from "nodemailer"
@Injectable()
export class AuthService {
  constructor(@Inject('Sequelize') private sequelize: Sequelize) { }

  async login(userdata: LoginData) {
    const { Usuario } = this.sequelize.models
    const options: FindOptions = {}
    options.where = { usuario: userdata.usuario }
    options.include = ['Persona']
    const user = await Usuario.findOne(options)
    const _user: LoginData = user?.toJSON()

    if (_user && _user.contrasena === userdata.contrasena) {
      const { contrasena, ...result } = _user
      return result
    }
    throw new UnauthorizedException()
  }

  async sendCode(email: string) {
    console.log(email)
    const { Persona } = this.sequelize.models
    const options: FindOptions = {}
    options.where = { correo: email }
    options.include = ['User', 'Usuario']
    const _persona = await Persona.findOne(options)
    if (_persona)
      return this._sendCode(_persona as any)
    else
      throw new HttpException('No existe una cuenta con el correo ' + email, 404)
  }

  private async _sendCode(persona: Persona) {
    const code = this.generateCode()
    const _code = await this.createCode(persona, code)
    if (_code)
      return this.sendCodeByEmail(persona.correo, code)
    else
      this.onError()

  }

  private generateCode() {
    let result = ''
    const characters = '0123456789'

    for (let i = 0;i < 6;i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      )
    }
    return result
  }

  private async createCode(persona: Persona, code) {
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)

    const options: FindOptions = {}
    const Op = sequelize.Op
    options.where = {
      usuario_id: persona.User?.id,
      fecha_uso: null,
      fecha_expiracion: { [Op.gt]: today },
    }
    const { RecuperacionContrasena } = this.sequelize.models
    const item = await RecuperacionContrasena.findOne(options)


    const data: RecuperacionContrasena = {
      codigo_verificacion: code,
      fecha_creacion: today,
      fecha_expiracion: tomorrow,
    }

    if (item) return await item.update(data)

    data.usuario_id = persona.User?.id
    return await RecuperacionContrasena.create(data)
  }

  private onError() {
    throw new HttpException('Ocurrio un error, por favor intente nuevamente.', 500)
  }

  private async sendCodeByEmail(email, code) {

    let info = await this.transporter.sendMail({
      from: '"Unilapp" <soporte@unilapp.com>',
      to: email,
      subject: "Código para reestablecer contraseña",
      text: "Su código para reestablecer la contraseña de su cuenta en Unilapp es: " + code,

    })

    if (info.messageId)
      return {
        message: 'Se envió un código al correo electrónico para reestablecer la contraseña. El código es valido por 24 horas'
      }
    else this.onError()
  }

  private get transporter() {
    return nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: 'unilapp.co',
        pass: 'nyinzudzcmitwkql',
      },
    })
  }

  async accountRecovery(code: string) {
    const _code = await this.getValidCode(code)
    return this.login(_code.Usuario)
  }

  private async getValidCode(code: string): Promise<RecuperacionContrasena> {
    const { RecuperacionContrasena } = this.sequelize.models
    const options: FindOptions = {}
    const today = new Date()
    const Op = sequelize.Op
    options.where = {
      codigo_verificacion: code,
      fecha_uso: null,
      fecha_expiracion: { [Op.gt]: today },
    }
    options.include=['Usuario']
    const validCode = await RecuperacionContrasena.findOne(options)

    if (!validCode) throw new HttpException('Ocurrio un error,verifique o solicite un nuevo código e intenta de nuevo.', 500)

    await validCode.update({ fecha_uso: today })

    return validCode.toJSON()
  }
}
