import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateCalendarDto } from './create-calendar.dto';

export class UpdateCalendarDto extends PartialType(CreateCalendarDto) {
  @IsNotEmpty()
  _id: string;
  title?: string;
  descryption?: string;
  author?: string;
  eventDate?: string;
  eventTime?: string;
}
