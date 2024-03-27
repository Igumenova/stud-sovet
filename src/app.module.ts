import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompositionModule } from './composition/composition.module';
import { CompositionService } from './composition/composition.service';
import { NewsModule } from './news/news.module';
import { CalendarModule } from './calendar/calendar.module';
import { CalendarService } from './calendar/calendar.service';
import { NewsService } from './news/news.service';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { AuthMiddleware } from './common/middleware/auth.middleware';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CompositionModule,
    NewsModule,
    CalendarModule,
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
    MulterModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService, CompositionService, CalendarService, NewsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '/admin/login', method: RequestMethod.ALL })
      .forRoutes({ path: '/admin/*', method: RequestMethod.ALL });
  }
}
