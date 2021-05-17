import { CommonFunctionsController } from '../../common/common-functions.controller';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RecuperacionesContrasenaMiddleware } from './recuperaciones-contrasena.middleware';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [CommonFunctionsController],
})
export class RecuperacionesContrasenaModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RecuperacionesContrasenaMiddleware)
      .forRoutes('recuperaciones-contrasena');
  }
}
