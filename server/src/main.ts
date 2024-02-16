import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
// import { corsOptions } from './config/cors';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
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

  // Prefix /api/
  app.setGlobalPrefix('api');

  // // Cors
  // app.enableCors(corsOptions);

  // server
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
  console.log(`Server running on: ${await app.getUrl()}`);
}
bootstrap();
