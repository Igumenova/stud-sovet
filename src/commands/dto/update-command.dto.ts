import { IsNotEmpty } from 'class-validator';
import { Track } from '../data/track.enum';
import { PartialType } from '@nestjs/mapped-types';
import { CreateCommandDto } from './create-command.dto';

export class UpdateCommandDto extends PartialType(CreateCommandDto) {
  @IsNotEmpty()
  _id: string;
  teamName?: string;
  track?: Track;
  members?: number;
  token?: string;
  comment?: string;
}
