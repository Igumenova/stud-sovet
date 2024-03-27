import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Res,
  Session,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CompositionService } from './composition/composition.service';
import { CalendarService } from './calendar/calendar.service';
import { FormDataRequest } from 'nestjs-form-data';
import { NewsService } from './news/news.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly compositionService: CompositionService,
    private readonly calendarService: CalendarService,
    private readonly newsService: NewsService,
  ) {}

  @Get()
  @Render('client/main/pug/index.pug')
  async home(@Session() session: Record<string, any>, @Res() res: Response) {
    return { host: process.env.HOST };
  }

  @Get('/calendar')
  @Render('client/calendar/pug/index.pug')
  async calendar(
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    let allEvents = await this.calendarService.getAllCalendar();
    return { allEvents, host: process.env.HOST };
  }

  @Get('/composition')
  @Render('client/composition/pug/index.pug')
  async composition(
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    let compositionsSS =
      await this.compositionService.getCompositionByDepartment('студСовет');
    let compositionsOt =
      await this.compositionService.getCompositionByDepartment('отделы');
    let compositionsPre =
      await this.compositionService.getCompositionByDepartment('председатели');
    let compositionsPro =
      await this.compositionService.getCompositionByDepartment('проекты');
    return {
      compositionsSS,
      compositionsOt,
      compositionsPre,
      compositionsPro,
      host: process.env.HOST,
    };
  }

  @Get('/news')
  @Render('client/news/pug/index.pug')
  async news(@Session() session: Record<string, any>, @Res() res: Response) {
    let allNews = await this.newsService.getAllNews();
    return { allNews, host: process.env.HOST };
  }

  @Get('/contacts')
  @Render('client/contacts/pug/index.pug')
  async contacts(
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    return { host: process.env.HOST };
  }

  @Get('/admin/login')
  @Render('admin/login/login.pug')
  async login() {
    return { error: false };
  }

  @Post('admin/login')
  @FormDataRequest()
  async checkToken(
    @Body() body: { token: string },
    @Res() res: Response,
    @Session() session: Record<string, any>,
  ) {
    if (body.token === process.env.SECRET_KEY) {
      session.token = body.token;
      res.status(302).redirect('/admin/news');
    } else {
      res.render('admin/login/login.pug', { error: true });
    }
  }
}
