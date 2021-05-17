import { CommonFunctionsController } from '../../common/common-functions.controller';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsuariosMiddleware } from './usuarios.middleware';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [CommonFunctionsController],
})
export class UsuariosModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UsuariosMiddleware).forRoutes('usuarios');
  }
}
