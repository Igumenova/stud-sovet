import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";
import { CreateMemberDto } from "./create-member.dto";
import { MemberStatus } from "../data/member.status.enum";

export class UpdateMemberDto extends PartialType(CreateMemberDto) {
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