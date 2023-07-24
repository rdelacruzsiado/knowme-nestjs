import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Knowme REST API')
    .setDescription('API REST de la red social Knowme')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
