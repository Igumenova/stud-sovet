import { AbstractNeDBDaoImpl } from 'src/common/db/abstract.dao';
import { Calendar } from '../entity/calendar.entity';
import { CreateCalendarDto } from '../dto/create-calendar.dto';
import { UpdateCalendarDto } from '../dto/update-calendar.dto';

export class CalendarDao extends AbstractNeDBDaoImpl<
  Calendar,
  CreateCalendarDto,
  UpdateCalendarDto
> {
  private static instance: CalendarDao;

  private constructor() {
    super('calendar');
  }

  public static getInstance(): CalendarDao {
    if (!CalendarDao.instance) {
      CalendarDao.instance = new CalendarDao();
    }
    return CalendarDao.instance;
  }
}
