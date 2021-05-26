import { Routes } from 'nest-router';
import { AuthModule } from './auth/auth.module';
import { ContactosModule } from './contactos/contactos.module';
import { EstadosModule } from './estados/estados.module';
import { FacultadesModule } from './facultades/facultades.module';
import { FinalidadesModule } from './finalidades/finalidades.module';
import { PersonasModule } from './personas/personas.module';
import { PublicacionesModule } from './publicaciones/publicaciones.module';
import { RecuperacionesContrasenaModule } from './recuperaciones-contrasena/recuperaciones-contrasena.module';
import { TipoPublicacionesModule } from './tipo-publicaciones/tipo-publicaciones.module';
import { UsuariosModule } from './usuarios/usuarios.module';

export const publicRoutes: Routes = [
  { path: 'estados', module: EstadosModule },
  { path: 'facultades', module: FacultadesModule },
  { path: 'finalidades', module: FinalidadesModule },
  { path: 'personas', module: PersonasModule },
  { path: 'publicaciones', module: PublicacionesModule },
  {
    path: 'recuperaciones-contrasena',
    module: RecuperacionesContrasenaModule,
  },
  { path: 'tipo-publicaciones', module: TipoPublicacionesModule },
  { path: 'usuarios', module: UsuariosModule },
  { path: 'auth', module: AuthModule },
  { path: 'contactos', module: ContactosModule },
];
