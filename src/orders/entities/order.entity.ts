import { stage, MemberStatus } from '../data/stage.enum';

export class Order {
  _id: string;
  date: Date;
  dateString?: string;
  contact: string;
  customer: string;
  name: string;
  message: string;
  stage: stage;
  comment: string;
}

export class Member{
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

export class Command{
  _id: string;
  date: Date;
  teamName: string;
  track: string;
  maxMembers:number = 5;
  members:number = 0;
  token: string;
}