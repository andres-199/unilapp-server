import { Usuario } from '../usuarios/usuario.interface';

export interface Persona {
  id?: number;
  nombre?: string;
  apellido?: string;
  correo?: string;
  identificacion?: string;
  restaurante_id?: number;
  Usuario?: Usuario;
  User?: Usuario;
}
