import { IsString } from 'class-validator';

export class CreateCalendarDto {
  date: Date;
  @IsString()
  title: string;
  @IsString()
  descryption: string;
  @IsString()
  author: string;
  @IsString()
  eventDate: string;
  @IsString()
  eventTime: string;
}
