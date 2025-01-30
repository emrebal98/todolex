import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { EnvService } from './env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = app.get(EnvService);

  app.use(
    session({
      name: env.get('COOKIE_NAME'),
      secret: env.get('COOKIE_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: { secure: env.get('IS_SECURE_COOKIE') },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe());

  const documentConfig = new DocumentBuilder().setTitle('Auth').setDescription('The auth API description').setVersion('').addCookieAuth(env.get('COOKIE_NAME')).build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(env.get('PORT'), '0.0.0.0');
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch(console.error);
