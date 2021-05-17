import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { routes } from './app.routes';

@Module({
  imports: [
    RouterModule.forRoutes(routes),
  ],
})
export class AppModule {}
