import { Module } from '@nestjs/common';
import { EstadosModule } from './estados/estados.module';
import { FacultadesModule } from './facultades/facultades.module';
import { FinalidadesModule } from './finalidades/finalidades.module';
import { PersonasModule } from './personas/personas.module';
import { PublicacionesModule } from './publicaciones/publicaciones.module';
import { RecuperacionesContrasenaModule } from './recuperaciones-contrasena/recuperaciones-contrasena.module';
import { TipoPublicacionesModule } from './tipo-publicaciones/tipo-publicaciones.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    EstadosModule,
    FacultadesModule,
    FinalidadesModule,
    PersonasModule,
    PublicacionesModule,
    RecuperacionesContrasenaModule,
    TipoPublicacionesModule,
    UsuariosModule,
  ],
})
export class PublicModule {}
