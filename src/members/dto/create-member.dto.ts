import { IsEmail, IsString } from "class-validator";

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