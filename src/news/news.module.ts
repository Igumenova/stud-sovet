import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
  ],
  providers: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}
