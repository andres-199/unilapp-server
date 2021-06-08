import { Usuario } from '../usuarios/usuarios.entity';

export interface RecuperacionContrasena {
  id?: number;
  fecha_creacion?: Date;
  fecha_expiracion?: Date;
  fecha_uso?: Date;
  codigo_verificacion?: string;
  usuario_id?: number;
  Usuario?: Usuario;
}
