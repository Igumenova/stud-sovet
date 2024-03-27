import { IsString } from 'class-validator';

export class CreateCompositionDto {
  _id: string;
  date: Date;
  @IsString()
  name: string;
  @IsString()
  surname: string;
  vk: string;
  @IsString()
  job: string;
  @IsString()
  departament: string;
  file:string;
}
