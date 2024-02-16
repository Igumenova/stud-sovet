import { Injectable, Redirect } from '@nestjs/common';
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

  async deleteCommand(_id: string): Promise<boolean> {
    let command = await this.dao.getByFilter({ _id });
    await MembersDao.getInstance().deleteByFilter({
      commandToken: command.commandToken,
    });
    return this.dao.deleteByFilter({ _id });
  }

  async updateCommand(
    _id: string,
    newCommand: UpdateCommandDto,
  ): Promise<number | Command> {
    const oldCommand = (await this.getCommandById(_id)) as UpdateCommandDto;
    for (const key of Object.keys(newCommand)) {
      oldCommand[key] = newCommand[key];
    }
    return this.dao.update({ _id }, oldCommand);
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

    let checkResult = await this.commandIdentityCheck(command);
    if (checkResult == 'kk') {
      MembersDao.getInstance().insert(createMemberDto);
      this.dao.insert(createCommandDto);
      return command.commandToken;
    } else {
      return checkResult;
    }
  }

  private async commandIdentityCheck(
    command: RegisterCommandDto,
  ): Promise<string> {
    if (!this.isAdult(command.birthDay)) {
      return 'Вам нет 18ти.';
    }
    if (Number(command.birthDay.slice(0, 4)) <= 1950) {
      return 'Неверно указан возраст.';
    }
    if (await this.dao.getByFilter({ teamName: command.teamName })) {
      return 'Команда с таким названием уже существует.';
    }
    if (await MembersDao.getInstance().getByFilter({ email: command.email })) {
      return 'Пользователь с такой почтой уже существует.';
    }
    if (await MembersDao.getInstance().getByFilter({ tel: command.tel })) {
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
