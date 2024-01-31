import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDto, CreateOrderDto, CreateCommandDto } from './create-order.dto';
import { stage, MemberStatus, Track } from '../data/stage.enum';
import { IsNotEmpty } from 'class-validator';
import { Member } from '../entities/order.entity';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsNotEmpty()
  _id: string;
  customer?: string;
  date?: Date | string;
  contact?: string;
  message?: string;
  name?: string;
  comment?: string;
  stage?: stage;
}

export class UpdateMemberDto extends PartialType(CreateMemberDto){
  @IsNotEmpty()
  _id: string;
  namec?: string;
  surname?: string;
  patronymic?: string;
  birthDay?: string;
  email?: string;
  tel?: string;
  memberStatus?: MemberStatus;
}

export class UpdateCommandDto extends PartialType(CreateCommandDto){
  @IsNotEmpty()
  _id: string;
  teamName?: string;
  track?: Track;
  members?: number;
  token?: string;
}
