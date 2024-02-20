import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Track } from '../data/track.enum';

export class RegisterCommandDto {
  @IsString()
  teamName: string;
  @IsEnum(Track)
  firstTrack: Track;
  @IsEnum(Track)
  secondTrack: Track;
  @IsEnum(Track)
  thirdTrack: Track;

  @IsString()
  surname: string;
  @IsString()
  name: string;
  @IsString()
  patronymic: string;
  @IsString()
  birthDay: string;
  @IsEmail()
  email: string;
  @IsString()
  tel: string;

  commandToken?: string;
}
