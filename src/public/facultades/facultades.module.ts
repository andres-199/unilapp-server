import { CommonFunctionsController } from '../../common/common-functions.controller';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { FacultadesMiddleware } from './facultades.middleware';
import { CommonModule } from '../../common/common.module';
import { FacultadesController } from './facultades.controller';
import { FacultadesService } from './facultades.service';

@Module({
  imports: [CommonModule],
  controllers: [FacultadesController, CommonFunctionsController],
  providers: [FacultadesService],
})
export class FacultadesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FacultadesMiddleware).forRoutes('facultades');
  }
}
