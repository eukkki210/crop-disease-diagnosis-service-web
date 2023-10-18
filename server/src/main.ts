import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const express = require('express');
  app.use(express.static(join(__dirname, '..', '..', 'client/build')));

  await app.listen(3000);
}
bootstrap();
