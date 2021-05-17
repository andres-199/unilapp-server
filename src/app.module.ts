import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { routes } from './app.routes';
import { PublicModule } from './public/public.module';

@Module({
  imports: [PublicModule, RouterModule.forRoutes(routes)],
})
export class AppModule {}
