import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  
  const options = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description for an e-commerse project constructed with nest.Js and MongoDB')
    .addBearerAuth()
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);  
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();
