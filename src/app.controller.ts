import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Track } from './commands/data/track.enum';
import { FormDataRequest } from 'nestjs-form-data';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('client/pug/index')
  async home(@Session() session: Record<string, any>, @Res() res: Response) {
    return { orderIsSend: session.orderIsSend, FirstTrack: Track.FIRSTTRACK, SecondTrack: Track.SECONDTRACK, ThirdTrack: Track.THIRDTRACK };
  }

  @Get('/showtoken')
  @Render('client/pug/showToken')
  async tokenPage(@Session() session: Record<string, any>, @Req() req) {
    //TODO: дописать страничку для показа токена. и добавить на страничку инструкцию по использованию
    throw new Error('Страница показа токена еще не реализована.');

    const { token } = req.query || req.params;
    return { token };
  }

  @Get('admin/login')
  @Render('admin/pug/login')
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
    if (body.token === process.env.TOKEN) {
      session.token = body.token;
      res.status(302).redirect('/admin/commands');
    } else {
      res.render('admin/pug/login', { error: true });
    }
  }
}
