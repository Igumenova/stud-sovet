import { Injectable, NotFoundException, Redirect } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MembersDao } from './dao/members.dao';
import { Member } from './entity/member.entity';
import { CommandsDao } from 'src/commands/dao/commands.dao';
import { Command } from 'src/commands/entity/command.entity';
import { Exception, compileAsync } from 'sass';
import { MemberStatus } from './data/member.status.enum';
import { UpdateCommandDto } from 'src/commands/dto/update-command.dto';
import { Track } from 'src/commands/data/track.enum';

@Injectable()
export class MembersService {
  private dao: MembersDao;

  constructor() {
    this.dao = MembersDao.getInstance();
  }

  getMemberById(_id: string): Promise<Member> {
    return this.dao.getByFilter({ _id });
  }

  async deleteMember(_id: string): Promise<boolean> {
    let member = await this.dao.getByFilter({ _id });
    let command = await CommandsDao.getInstance().getByFilter({
      commandToken: member.commandToken,
    });
    let updateCommandDto = command as UpdateCommandDto;
    updateCommandDto.members -= 1;
    await CommandsDao.getInstance().update(
      { _id: command._id },
      updateCommandDto,
    );

    if (member.memberStatus == 'captain') {
      let newCaptain = await this.dao.getByFilter({
        commandToken: member.commandToken,
        memberStatus: 'member',
      });
      newCaptain.memberStatus = MemberStatus.CAPTAIN;
      await this.updateMember(newCaptain._id, newCaptain);
    }

    return this.dao.deleteByFilter({ _id });
  }

  async updateMember(
    _id: string,
    newMember: UpdateMemberDto,
  ): Promise<number | Member> {
    const oldMember = (await this.getMemberById(_id)) as UpdateCommandDto;
    for (const key of Object.keys(newMember)) {
      oldMember[key] = newMember[key];
    }
    return this.dao.update({ _id }, oldMember);
  }

  getAllMember(): Promise<Member[]> {
    return this.dao.getAll();
  }

  async addMember(createMemberDto: CreateMemberDto): Promise<string> {
    const newMember = new CreateMemberDto();

    newMember.name = createMemberDto.name;
    newMember.surname = createMemberDto.surname;
    newMember.patronymic = createMemberDto.patronymic;
    newMember.birthDay = createMemberDto.birthDay;
    newMember.email = createMemberDto.email;
    newMember.tel = createMemberDto.tel;
    newMember.commandToken = createMemberDto.commandToken;
    newMember.memberStatus = MemberStatus.MEMBER;
    newMember.date = new Date();

    let result = await this.memberIdentityCheck(newMember);
    if (result == 'kk') {
      let command = await CommandsDao.getInstance().getByFilter({
        commandToken: createMemberDto.commandToken,
      });
      let updateCommandDto = command as UpdateCommandDto;
      updateCommandDto.members += 1;
      await CommandsDao.getInstance().update(
        { _id: command._id },
        updateCommandDto,
      );
      this.dao.insert(newMember);
      return 'Вы успешно присоединились к команде';
    } else {
      return result;
    }
  }

  private async memberIdentityCheck(member: CreateMemberDto): Promise<string> {
    if (
      !(await CommandsDao.getInstance().getByFilter({
        commandToken: member.commandToken,
      }))
    ) {
      return 'Команды с таким токеном не существует.';
    }
    let command = await CommandsDao.getInstance().getByFilter({
      commandToken: member.commandToken,
    });
    if (command.maxMembers == command.members) {
      return 'В команде уже максимальное число участников.';
    }
    if (this.isAdult(member.birthDay)) {
      return 'Вам нет 18-ти.';
    }
    if (await this.dao.getByFilter({ email: member.email })) {
      return 'Пользователь с такой почтой уже существует.';
    }
    if (await this.dao.getByFilter({ tel: member.tel })) {
      return 'Пользователь с таким телефоном уже существует.';
    }
    return 'kk';
  }

  private isAdult(dateOfBirth: string): boolean {
    let currentDate = new Date();
    let birthDate = new Date(dateOfBirth);

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    if (currentDate.getMonth() < birthDate.getMonth()) {
      age -= 1;
    } else if (currentDate.getMonth() == birthDate.getMonth()) {
      if (currentDate.getDate() < birthDate.getDate()) {
        age -= 1;
      }
    }
    return age >= 18;
  }
}
