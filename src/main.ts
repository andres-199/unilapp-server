import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const volleyball = require('volleyball');
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  app.use(volleyball);
  await app.listen(3500);
}
bootstrap();
