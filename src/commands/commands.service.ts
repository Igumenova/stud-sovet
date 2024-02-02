import { Injectable } from '@nestjs/common';
import { UpdateCommandDto } from './dto/update-command.dto';
import { Command } from './entity/command.entity';
import { CommandsDao } from './dao/commands.dao';
import { CreateCommandDto } from './dto/create-command.dto';
import { RegisterCommandDto } from './dto/register-command.dto';
import { CreateMemberDto } from 'src/members/dto/create-member.dto';
import { MembersDao } from 'src/members/dao/members.dao';
import { v4 as uuidv4 } from 'uuid';
import { MemberStatus } from 'src/members/data/member.status.enum';

@Injectable()
export class CommandsService {
  private dao: CommandsDao;

  constructor() {
    this.dao = CommandsDao.getInstance();
  }

  getCommandById(_id: string): Promise<Command> {
    return this.dao.getByFilter({ _id });
  }

  deleteCommand(_id: string): Promise<boolean> {
    return this.dao.deleteByFilter({ _id });
  }

  updateCommand(
    _id: string,
    command: UpdateCommandDto,
  ): Promise<number | Command> {
    return this.dao.update({ _id }, command);
  }

  getAllCommands(): Promise<Command[]> {
    return this.dao.getAll();
  }

  /**
   * Метод предназначени для регистрации команды и записи в нее первого участника.
   * После регистрации команды, ей присвайвается токен.
   *
   * @bugfix проверять заполненность полей каждой из dto
   * @param command RegisterCommandDto
   * @returns токен команды
   */
  async regCommand(command: RegisterCommandDto): Promise<string> {
    const createCommandDto = new CreateCommandDto();
    const createMemberDto = new CreateMemberDto();

    command.commandToken = uuidv4();

    createCommandDto.teamName = command.teamName;
    createCommandDto.track = command.track;
    createCommandDto.commandToken = command.commandToken;
    createCommandDto.date = new Date();

    createMemberDto.name = command.name;
    createMemberDto.surname = command.surname;
    createMemberDto.patronymic = command.patronymic;
    createMemberDto.birthDay = command.birthDay;
    createMemberDto.email = command.email;
    createMemberDto.tel = command.tel;
    createMemberDto.commandToken = command.commandToken;
    createMemberDto.memberStatus = MemberStatus.CAPTAIN;
    createMemberDto.date = new Date();

    //добавить, чтобы эта ебала выводилась на сайт
    if (await this.commandIdentityCheck(command)) {
      MembersDao.getInstance().insert(createMemberDto);
      return this.dao.insert(createCommandDto);
    }
  }

  //добавить, чтобы эта ебала выводилась на сайт
  private async commandIdentityCheck(
    command: RegisterCommandDto,
  ): Promise<boolean> {
    if (await this.dao.getByFilter({ teamName: command.teamName })) {
      console.log(1);
      return false;
    }
    if (await MembersDao.getInstance().getByFilter({ email: command.email })) {
      console.log(2);
      return false;
    }
    if (await MembersDao.getInstance().getByFilter({ tel: command.tel })) {
      console.log(3);
      return false;
    }
    return true;
  }
}
