import { Injectable } from '@nestjs/common';
import { CalendarDao } from './dao/calendardao';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { Calendar } from './entity/calendar.entity';
import { CreateCalendarDto } from './dto/create-calendar.dto';

@Injectable()
export class CalendarService {
    private dao: CalendarDao;

  constructor() {
    this.dao = CalendarDao.getInstance();
  }

  getCalendarById(_id: string): Promise<Calendar> {
    return this.dao.getByFilter({ _id });
  }

  async deleteCalendar(_id: string): Promise<boolean> {
    return this.dao.deleteByFilter({ _id });
  }

  async updateCalendar(
    _id: string,
    newCalendar: UpdateCalendarDto,
  ): Promise<number | Calendar> {
    const oldCalendar = (await this.getCalendarById(_id)) as UpdateCalendarDto;
    for (const key of Object.keys(newCalendar)) {
      oldCalendar[key] = newCalendar[key];
    }
    return this.dao.update({ _id }, oldCalendar);
  }

  getAllCalendar(): Promise<Calendar[]> {
    return this.dao.getAll();
  }

  async createCalendar(calendar: CreateCalendarDto): Promise<string> {
    calendar.date = new Date();
    this.dao.insert(calendar);
    return 'true';
  }
}
