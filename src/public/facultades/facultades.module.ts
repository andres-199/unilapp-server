import { CommonFunctionsController } from '../../common/common-functions.controller';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { FacultadesMiddleware } from './facultades.middleware';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [CommonFunctionsController],
})
export class FacultadesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FacultadesMiddleware).forRoutes('facultades');
  }
}
