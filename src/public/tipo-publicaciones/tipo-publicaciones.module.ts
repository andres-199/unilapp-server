import { CommonFunctionsController } from '../../common/common-functions.controller';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TipoPublicacionesMiddleware } from './tipo-publicaciones.middleware';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [CommonFunctionsController],
})
export class TipoPublicacionesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TipoPublicacionesMiddleware).forRoutes('tipo-publicaciones');
  }
}
