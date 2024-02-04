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
    let message = session.message;
    session.message = '';
    return {
      orderIsSend: session.orderIsSend,
      FirstTrack: Track.FIRSTTRACK,
      SecondTrack: Track.SECONDTRACK,
      ThirdTrack: Track.THIRDTRACK,
      message: message,
      token: session.token,
    };
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
