import { IsDate, IsEnum, IsString } from 'class-validator';
import { Track } from '../data/track.enum';

export class CreateCommandDto {
  @IsString()
  teamName: string;
  @IsEnum(Track)
  track: Track;
  @IsString()
  commandToken: string;
  @IsDate()
  date: Date;
}
