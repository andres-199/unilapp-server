import { CommonFunctionsController } from '../../common/common-functions.controller';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { FinalidadesMiddleware } from './finalidades.middleware';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [CommonFunctionsController],
})
export class FinalidadesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FinalidadesMiddleware).forRoutes('finalidades');
  }
}
