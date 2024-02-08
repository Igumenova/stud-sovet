import { IsEmail, IsEnum, IsString } from "class-validator";
import { Track } from "../data/track.enum";

export class RegisterCommandDto {
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

    commandToken?: string;
}