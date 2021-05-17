import { CommonFunctionsController } from '../../common/common-functions.controller';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PersonasMiddleware } from './personas.middleware';
import { CommonModule } from '../../common/common.module';
import { PersonasController } from './personas.controller';
import { PersonasService } from './personas.service';

@Module({
  imports: [CommonModule],
  controllers: [PersonasController],
  providers: [PersonasService],
})
export class PersonasModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PersonasMiddleware).forRoutes('personas');
  }
}
