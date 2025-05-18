import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Prefijo global para todas las rutas de la API
  app.setGlobalPrefix('api');
  
  // Validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // configuración de Swagger
const config = new DocumentBuilder()
  .setTitle('Biblioteca API')
  .setDescription('API REST para la gestión de una biblioteca')
  .setVersion('1.0')
  .addTag('Auth', 'Operaciones de autenticación')
  .addTag('Users', 'Operaciones de usuarios')
  .addTag('Books', 'Operaciones de libros')
  .addTag('Authors', 'Operaciones de autores')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Ingresa tu token JWT',
      in: 'header',
    },
    'access-token',
  )
  .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-reference', app, document);
  
  await app.listen(3000);
}
bootstrap();