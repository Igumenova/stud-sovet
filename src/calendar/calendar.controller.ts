import { Body, Controller, Delete, Get, Param, Post, Put, Render, Res, Session } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { FormDataRequest } from 'nestjs-form-data';
import { Response } from 'express';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';

@Controller('/admin/calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post('/addCalendar')
  @FormDataRequest()
  async createCalendar(
    @Body() regCalendarDto: CreateCalendarDto,
    @Res()
    res: Response,
    @Session() session: Record<string, any>,
  ) {
    const regResult = await this.calendarService.createCalendar(regCalendarDto);
    session.orderIsSend = 1;
    res.status(302).redirect(process.env.HOST + '/admin/calendar');
  }

  @Get()
  @Render('admin/panel/calendar/calendar_admin')
  async calendar() {
    const allCalendar = await this.calendarService.getAllCalendar();
    return { allCalendar, host: process.env.HOST };
  }

  @Get('/addCalendar')
  @Render('admin/panel/calendar/calendar_add')
  async addCalendar() {
    return { host: process.env.HOST };
  }

  @Get(':id')
  @Render('admin/panel/calendar/calendar')
  async findOne(@Param('id') id: string) {
    const calendar = await this.calendarService.getCalendarById(id);
    return { calendar, host: process.env.HOST };
  }

  @Delete()
  async deleteCalendar(@Body() updateCalendarDto: UpdateCalendarDto, @Res() res: Response) {
    this.calendarService.deleteCalendar(updateCalendarDto._id);
    return res.status(200).send();
  }

  @Put()
  async updateCalendar(@Body() updateCalendarDto: UpdateCalendarDto, @Res() res: Response) {
    this.calendarService.updateCalendar(updateCalendarDto._id, updateCalendarDto);
    res.status(200).send();
  }
}
