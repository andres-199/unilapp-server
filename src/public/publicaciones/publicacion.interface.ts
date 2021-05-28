import { TipoPublicacion } from '../tipo-publicaciones/tipo-publicacion.interface';

export interface Publicacion {
  id?: number;
  tipo_publicacion_id?: number;
  persona_id?: number;
  nombre?: string;
  descripcion?: string;
  imagenes?: JSON;
  contacto?: JSON;
  estado_id?: number;
  finalidad_id?: number;
  facultad_id?: number;
  TipoPublicacion: TipoPublicacion;
}
