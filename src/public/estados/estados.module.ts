import { CommonFunctionsController } from '../../common/common-functions.controller';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { EstadosMiddleware } from './estados.middleware';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [CommonFunctionsController],
})
export class EstadosModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EstadosMiddleware).forRoutes('estados');
  }
}
