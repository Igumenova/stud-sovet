import { Controller, Get, Render, Res, Session } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('client/main/pug/index.pug')
  async home() {
    return {};
  }

  @Get('/mem')
  @Render('client/main/pug/news.pug')
  async fdfd() {
    return {};
  }

  @Get('/news')
  @Render('client/main/pug/news.pug')
  async fdfdfd() {
    return {};
  }
}
