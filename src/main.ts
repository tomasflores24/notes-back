import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { CORS, configSwagger, ConfigValidationPipe } from './config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(ConfigValidationPipe);
  app.setGlobalPrefix('api');
  app.enableCors(CORS);
  app.use(morgan('dev'));

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('doc', app, document);

  const PORT = process.env.APP_PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
