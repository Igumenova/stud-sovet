import { Injectable } from '@nestjs/common';
import { News } from './entity/news.entity';
import { NewsDao } from './dao/newsdao';
import { UpdateNewsDto } from './dto/update-news.dto';
import { CreateNewsDto } from './dto/create-news.dto';
import { v4 as uuidv4 } from 'uuid';
import { writeFile, writeFileSync } from 'fs';
import { MulterModule } from '@nestjs/platform-express';

@Injectable()
export class NewsService {
  private dao: NewsDao;

  constructor() {
    this.dao = NewsDao.getInstance();
  }

  getNewsById(_id: string): Promise<News> {
    return this.dao.getByFilter({ _id });
  }

  async deleteNews(_id: string): Promise<boolean> {
    return this.dao.deleteByFilter({ _id });
  }

  async updateNews(
    _id: string,
    newNews: UpdateNewsDto,
  ): Promise<number | News> {
    const oldNews = (await this.getNewsById(_id)) as UpdateNewsDto;
    for (const key of Object.keys(newNews)) {
      oldNews[key] = newNews[key];
    }
    return this.dao.update({ _id }, oldNews);
  }

  getAllNews(): Promise<News[]> {
    return this.dao.getAll();
  }

  async createNews(
    news: CreateNewsDto,
    file: Express.Multer.File,
  ): Promise<string> {
    news.date = new Date();
    news.file = file.filename;

    this.dao.insert(news);
    return 'true';
  }
}
