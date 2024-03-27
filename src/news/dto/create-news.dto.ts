import { IsString } from 'class-validator';

export class CreateNewsDto {
  date: Date;
  @IsString()
  title: string;
  @IsString()
  descryption: string;
  @IsString()
  author: string;
  file: string;
}
