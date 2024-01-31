import { IsDate, IsEmail, IsEnum, IsString } from 'class-validator';
import { Track } from '../data/stage.enum';

export class CreateOrderDto {
  @IsString()
  name: string;
  @IsString()
  message: string;
  @IsEmail()
  contact: string;
}

export class CreateMemberDto {
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
  @IsString()
  commandToken: string;
}

export class CreateCommandDto {
  @IsString()
  teamName: string;
  @IsEnum(Track)
  track: Track;

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
}
