import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  //Validation
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  //Configuration
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const api_port = configService.get('API_PORT');

  //Swagger
  const config = new DocumentBuilder()
    .setTitle('Auth microservice')
    .setDescription('The auth API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  //Microservices
  app.connectMicroservice(
    {
      transport: Transport.TCP,
      options: {
        port: port,
      },
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservicesAsync();

  //Start
  await app.listen(api_port);
}
bootstrap();
