import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setViewEngine('ejs');
  app.useGlobalPipes(new ValidationPipe());
  // Configuration CORS
 const corsOptions: CorsOptions = {
  origin: ['http://localhost:3001','http://localhost:3000'],// Remplacez par l'URL de votre application React
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Si vous avez besoin de gérer les cookies
  };
  app.enableCors(corsOptions);
  await app.listen(3001);
}
bootstrap();
