import { IsEmail, IsString } from 'class-validator';
import { MemberStatus } from '../data/member.status.enum';

export class CreateMemberDto {
  @IsString()
  name: string;
  @IsString()
  surname: string;
  @IsString()
  patronymic: string;
  @IsString()
  birthDay: string;
  @IsEmail()
  email: string;
  @IsString()
  tel: string;
  memberStatus?: MemberStatus;
  @IsString()
  commandToken: string;

  date?: Date;
}
