import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { Track } from '../data/track.enum';

export class CreateCommandDto {
  @IsString()
  teamName: string;
  @IsEnum(Track)
  firstTrack: Track;
  @IsEnum(Track)
  secondTrack: Track;
  @IsEnum(Track)
  thirdTrack: Track;
  @IsString()
  commandToken: string;
  @IsNumber()
  maxMembers: number = 3;
  @IsNumber()
  members: number = 1;
  @IsDate()
  date: Date;
}
