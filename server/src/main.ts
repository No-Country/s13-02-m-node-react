/* eslint-disable prettier/prettier */
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { corsOptions } from './config/cors';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Prefix /api/
  app.setGlobalPrefix('api');

  // Documentation Swagger config
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API Documentation')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('themes')
    .addTag('users')
    .addTag('auth')
    .addTag('stacks')
    .addTag('themes progress')
    .addTag('stack progress')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, document);

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Solo validar los campos definidos en la clase del DTO
      forbidNonWhitelisted: true, // Rechazar cualquier campo no definido en la clase del DTO
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Transformer usage
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  // Log
  app.use(morgan('dev'));

  // Cors
  app.enableCors(corsOptions);

  // server
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
  console.log(`Server running on: ${await app.getUrl()}`);
}
bootstrap();
