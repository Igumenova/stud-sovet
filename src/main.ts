import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

import session = require('express-session');
import store = require('nedb-session-store');
const NedbStore = store(session);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'gulp-app'));
  app.setViewEngine('pug');

  app.use(
    session({
      secret: process.env.SECRET_KEY,
      resave: true,
      store: new NedbStore({
        filename: 'db/store.db',
      }),
      saveUninitialized: true,
      cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 },
    }),
  );

  await app.listen(process.env.PORT);
}
bootstrap();
