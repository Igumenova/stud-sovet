import { Injectable, NotFoundException } from '@nestjs/common';
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
  deleteMember(_id: string): Promise<boolean> {
    return this.dao.deleteByFilter({ _id });
  }
  updateMember(
    _id: string,
    command: UpdateMemberDto,
  ): Promise<number | Member> {
    return this.dao.update({ _id }, command);
  }

  async addMember(createMemberDto: CreateMemberDto) {
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

    // const command: Command = await CommandsDao.getInstance().getByFilter(commandToken)
    // if (!command) {
    //     // TODO создать NotMatchTokenException и фильторок к нему
    //     throw new NotFoundException('Кастомный exception для несовпадения token');
    // }

    if (await this.memberIdentityCheck(newMember)) {
      let command = await CommandsDao.getInstance().getByFilter({
        commandToken: createMemberDto.commandToken,
      });
      let updateCommandDto = command as UpdateCommandDto;
      updateCommandDto.members += 1;
      await CommandsDao.getInstance().update(
        { _id: command._id },
        updateCommandDto,
      );
      return this.dao.insert(newMember);
    }
  }

  private async memberIdentityCheck(member: CreateMemberDto): Promise<boolean> {
    if (
      !(await CommandsDao.getInstance().getByFilter({
        commandToken: member.commandToken,
      }))
    ) {
      console.log(1);
      return false;
    }
    let command = await CommandsDao.getInstance().getByFilter({
      commandToken: member.commandToken,
    });
    if (command.maxMembers == command.members) {
      console.log(2);
      return false;
    }
    if (await this.dao.getByFilter({ email: member.email })) {
      console.log(3);
      return false;
    }
    if (await this.dao.getByFilter({ tel: member.tel })) {
      console.log(4);
      return false;
    }
    return true;
  }
}
