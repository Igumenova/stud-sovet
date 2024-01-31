import { Injectable, NotFoundException } from '@nestjs/common';
import { Command, Member, Order } from './entities/order.entity';
import {
  CreateCommandDto,
  CreateMemberDto,
  CreateOrderDto,
} from './dto/create-order.dto';
import {
  UpdateCommandDto,
  UpdateMemberDto,
  UpdateOrderDto,
} from './dto/update-order.dto';
import { MemberStatus, Track, stage } from './data/stage.enum';
import { convertDate } from './utils/convert_order.util';
// import * as randomstring from 'randomstring';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const NeDB = require('nedb-promises');

@Injectable()
export class OrdersService {
  private db: any;
  private commanddb: any;
  private membersdb: any;
  constructor() {
    this.db = NeDB.create({ filename: 'db/orders.db', autoload: true });
    this.commanddb = NeDB.create({
      filename: 'db/commands.db',
      autoload: true,
    });
    this.membersdb = NeDB.create({ filename: 'db/members.db', autoload: true });
  }

  getAllCommands(): Promise<Command[]> {
    return this.commanddb.find({});
  }

  //допилить
  // async getAllCommandsWithDateString(): Promise<Command[]> {//не надо
  //   const commands = await this.getAllOrders();
  //   return commands.map((e: Command) => {
  //     e.dateString = convertDate(e.date);
  //     return e;
  //   });
  // }

  getAllOrders(): Promise<Order[]> {
    //не надо
    return this.db.find({});
  }

  async getAllOrdersWithDateString(): Promise<Order[]> {
    //не надо
    const orders = await this.getAllOrders();
    return orders.map((e: Order) => {
      e.dateString = convertDate(e.date);
      return e;
    });
  }

  getOrderById(_id: string): Promise<Order> {
    //не надо
    return this.db.findOne({ _id });
  }

  async getOrderByIdWithDateString(_id: string): Promise<Order[]> {
    //не надо
    const order = await this.db.findOne({ _id });
    order.dateString = convertDate(order.date);
    return order;
  }

  getOrderWhere(filter: any): Promise<Order> {
    //не надо
    return this.db.findOne(filter);
  }

  getCommandWhere(filter: any): Promise<Command> {
    return this.commanddb.find({});
  }

  getCommandByToken(tokenString: string): Promise<UpdateCommandDto> {
    return this.commanddb.findOne({ token: tokenString });
  }

  getCommandById(_id: string): Promise<Command> {
    return this.commanddb.findOne({ _id });
  }

  getCommandByTeamName(teamName): Promise<Command> {
    return this.commanddb.findOne({ teamName: teamName });
  }

  getMemberById(_id: string): Promise<Member> {
    return this.membersdb.findOne({ _id });
  }

  getMemberByEmail(email: string): Promise<Member> {
    return this.membersdb.findOne({ email: email });
  }

  getMemberByTel(tel: string): Promise<Member> {
    return this.membersdb.findOne({ tel: tel });
  }

  async addCommand(dto: CreateCommandDto): Promise<Command> {
    if (await this.commandIsTrue(dto)) {
      const token = uuidv4();
      const command = new Command();
      command.date = new Date();
      command.teamName = dto.teamName;
      command.track = dto.track;
      command.token = token;
      command.members += 1;
      this.commanddb.insert(command);

      const member = new Member();
      member.date = new Date();
      member.surname = dto.surname;
      member.name = dto.name;
      member.patronymic = dto.patronymic;
      member.birthDay = dto.birthDay;
      member.email = dto.email;
      member.tel = dto.tel;
      member.memberStatus = MemberStatus.CAPTAIN;
      member.commandToken = token;
      return this.membersdb.insert(member);
    }
  }

  async addMember(dto: CreateMemberDto): Promise<Member> {
    if (await this.memberIsTrue(dto)) {
      const member = new Member();
      member.date = new Date();
      member.surname = dto.surname;
      member.name = dto.name;
      member.patronymic = dto.patronymic;
      member.birthDay = dto.birthDay;
      member.email = dto.email;
      member.tel = dto.tel;
      member.memberStatus = MemberStatus.MEMBER;
      member.commandToken = dto.commandToken;

      let command = await this.getCommandByToken(dto.commandToken);
      command.members += 1;
      await this.updateCommand(command._id, command);

      return this.membersdb.insert(member);
    }
  }

  async commandIsTrue(dto: CreateCommandDto): Promise<boolean> {
    if (await this.getCommandByTeamName(dto.teamName)) {
      console.log(1);
      return false;
      // throw new Error("Команда с таким названием уже существует")
    }
    if (this.getMemberByEmail(dto.email)) {
      console.log(2);
      return false;
      // throw new Error("Участник с такой почтой уже существует")
    }
    if (this.getMemberByTel(dto.tel)) {
      console.log(3);
      return false;
      // throw new Error("Участник с таким телефоном уже существует")
    }

    return true;
  }

  async memberIsTrue(dto: CreateMemberDto): Promise<boolean> {
    if (!(await this.getCommandByToken(dto.commandToken))) {
      console.log(1);
      return false;
    }
    if (await this.getMemberByEmail(dto.email)) {
      console.log(2);
      return false;
      // throw new Error("Участник с такой почтой уже существует");
    }
    if (await this.getMemberByTel(dto.tel)) {
      console.log(3);
      return false;
      // throw new Error("Участник с таким телефоном уже существует");
    }

    let command = await this.getCommandByToken(dto.commandToken);
    if (command.members == 5) {
      console.log(4);
      return false;
      // throw new Error("Команда переполнена");
    }

    return true;
  }

  // addOrder(dto: CreateOrderDto): Promise<Order> {
  //   const order = new Order();
  //   order.customer = dto.name;
  //   order.message = dto.message;
  //   order.contact = dto.contact;
  //   order.date = new Date();
  //   order.comment = '';
  //   order.name = 'Без названия';
  //   order.stage = stage.NEW;

  //   return this.db.insert(order);
  // }

  // async updateOrder(_id: string, newOrder: UpdateOrderDto): Promise<Order> {
  //   //не надо
  //   const oldOrder = await this.getOrderById(_id);
  //   for (const key of Object.keys(newOrder)) {
  //     oldOrder[key] = newOrder[key];
  //   }
  //   return this.db.update({ _id }, oldOrder);
  // }

  // deleteOrder(_id: string): Promise<Order> {
  //   //не надо
  //   return this.db.remove({ _id });
  // }

  async updateCommand(
    _id: string,
    newCommand: UpdateCommandDto,
  ): Promise<Command> {
    const oldCommand = await this.getCommandById(_id);
    for (const key of Object.keys(newCommand)) {
      oldCommand[key] = newCommand[key];
    }
    return this.commanddb.update({ _id }, oldCommand);
  }

  async updateMember(_id: string, newMember: UpdateMemberDto): Promise<Member> {
    const oldMember = await this.getMemberById(_id);
    for (const key of Object.keys(newMember)) {
      oldMember[key] = newMember[key];
    }
    return this.membersdb.update({ _id }, oldMember);
  }

  async deleteCommand(_id: string): Promise<Command> {
    let command = await this.commanddb.findOne({ _id });

    this.membersdb.remove({ commandToken: command.token }, { multi: true });
    this.commanddb.remove({ _id });
    return;
  }

  async deleteMember(_id: string): Promise<Member> {
    const member = this.membersdb.findOne({ _id });

    let command = await this.getCommandByToken(member.commandToken);
    command.members -= 1;
    await this.updateCommand(command._id, command);

    if (member.memberStatus == 'captain') {
      let newCaptain = await this.membersdb.findOne({
        commandToken: command.token,
      });
      newCaptain.memberStatus = 'captain';
      await this.updateMember(newCaptain._id, newCaptain);
    }

    return this.membersdb.remove({ _id });
  }
}
