import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsDto } from './create-news.dto';

export class UpdateNewsDto extends PartialType(CreateNewsDto) {
  @IsNotEmpty()
  _id: string;
  title?: string;
  descryption?: string;
  author?: string;
  file?: string;
}
