import { CommonFunctionsController } from '../../common/common-functions.controller';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PublicacionesMiddleware } from './publicaciones.middleware';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [CommonFunctionsController],
})
export class PublicacionesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PublicacionesMiddleware).forRoutes('publicaciones');
  }
}
