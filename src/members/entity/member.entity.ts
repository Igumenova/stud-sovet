import { MemberStatus } from "../data/member.status.enum";

/**
 * TODO: дописать нормальный API для класса и использовать его в программе
 */
export class Member {
  _id: string;
  date: Date;
  surname: string;
  name: string;
  patronymic: string;
  birthDay: string;
  email: string;
  tel: string;
  memberStatus: MemberStatus;
  commandToken: string;
}