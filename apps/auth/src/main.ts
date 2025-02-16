import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as passport from 'passport';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { EnvService } from './env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = app.get(EnvService);

  const basePath = env.get('BASE_PATH');
  if (basePath) {
    app.setGlobalPrefix(basePath);
  }

  app.use(passport.initialize());
  app.useGlobalPipes(new ValidationPipe());

  const documentConfig = new DocumentBuilder().setTitle('Auth').setVersion('').addBearerAuth({ type: 'http' }).addSecurityRequirements('bearer').build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api', app, document, { useGlobalPrefix: true, jsonDocumentUrl: `api-json`, ui: false });

  await app.listen(env.get('PORT'), '0.0.0.0');
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch(console.error);
