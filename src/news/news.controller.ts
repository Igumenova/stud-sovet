import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Render,
  Res,
  Session,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { FormDataRequest } from 'nestjs-form-data';
import { Response } from 'express';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Controller('admin/news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post('/addNews')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/main/src',
        filename: (req, file, cb) => {
          const randomName = uuidv4() + extname(file.originalname);
          cb(null, `${randomName}`);
        },
      }),
    }),
  )
  async createNews(
    @Body() regNewsDto: CreateNewsDto,
    @Res() res: Response,
    @Session() session: Record<string, any>,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const regResult = await this.newsService.createNews(regNewsDto, file);
    session.orderIsSend = 1;
    res.status(302).redirect(process.env.HOST + '/admin/news');
  }

  @Get()
  @Render('admin/panel/news/news_admin')
  async news() {
    const allNews = await this.newsService.getAllNews();
    return { allNews, host: process.env.HOST };
  }

  @Get('/addNews')
  @Render('admin/panel/news/news_add')
  async addNews() {
    return { host: process.env.HOST };
  }

  @Get(':id')
  @Render('admin/panel/news/news')
  async findOne(@Param('id') id: string) {
    const news = await this.newsService.getNewsById(id);
    return { news, host: process.env.HOST };
  }

  @Delete()
  async deleteNews(@Body() updateNewsDto: UpdateNewsDto, @Res() res: Response) {
    this.newsService.deleteNews(updateNewsDto._id);
    return res.status(200).send();
  }

  @Put()
  async updateNews(@Body() updateNewsDto: UpdateNewsDto, @Res() res: Response) {
    this.newsService.updateNews(updateNewsDto._id, updateNewsDto);
    res.status(200).send();
  }
}
