import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { NotFoundExceptionFilter } from './common/filters/not_found_exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { MembersModule } from './members/members.module';
import { CommandsModule } from './commands/commands.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthMiddleware } from './common/middleware/auth.middleware';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MembersModule,
    CommandsModule,
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/admin/login', method: RequestMethod.ALL },
        { path: '/admin/commands', method: RequestMethod.POST },
        { path: '/admin/members', method: RequestMethod.POST },
      )
      .forRoutes({ path: '/admin/*', method: RequestMethod.ALL });
  }
}
