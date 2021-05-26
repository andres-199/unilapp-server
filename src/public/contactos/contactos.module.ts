import { CommonFunctionsController } from '../../common/common-functions.controller';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ContactosMiddleware } from './contactos.middleware';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [CommonFunctionsController],
})
export class ContactosModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContactosMiddleware).forRoutes('contactos');
  }
}
