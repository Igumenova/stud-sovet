import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateCompositionDto } from './create-composition.dto';

export class UpdateCompositionDto extends PartialType(CreateCompositionDto) {
  @IsNotEmpty()
  _id: string;
  name?: string;
  surname?: string;
  vk?: string;
  job?: string;
  departament?: string;
  file?:string;
}
