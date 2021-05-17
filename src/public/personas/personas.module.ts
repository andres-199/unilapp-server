import { CommonFunctionsController } from '../../common/common-functions.controller';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PersonasMiddleware } from './personas.middleware';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [CommonFunctionsController],
})
export class PersonasModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PersonasMiddleware).forRoutes('personas');
  }
}
