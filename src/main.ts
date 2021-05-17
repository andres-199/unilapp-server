import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main');

let httpsOptions: any;
try {
  httpsOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/unilapp.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/unilapp.com/fullchain.pem'),
  };
  logger.log('Leyendo certificado SSL');
} catch (error) {
  logger.log('No se pudo encontrar el certificado SSL');
}

async function bootstrap() {
  const volleyball = require('volleyball');
  const app = await NestFactory.create(AppModule, { cors: true, httpsOptions });

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
