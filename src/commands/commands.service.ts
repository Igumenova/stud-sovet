import { Injectable } from '@nestjs/common';
import { UpdateCommandDto } from './dto/update-command.dto';
import { Command } from './entity/command.entity';
import { CommandsDao } from './dao/commands.dao';
import { CreateCommandDto } from './dto/create-command.dto';
import { RegisterCommandDto } from './dto/register-command.dto';
import { CreateMemberDto } from 'src/members/dto/create-member.dto';
import { MembersDao } from 'src/members/dao/members.dao';
import { v4 as uuidv4 } from 'uuid';

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

    updateCommand(_id: string, command: UpdateCommandDto): Promise<number | Command> {
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
    regCommand(command: RegisterCommandDto): Promise<string> {
        const createCommandDto = command as CreateCommandDto;
        const createMemberDto = command as CreateMemberDto;

        createCommandDto.commandToken = uuidv4();
        MembersDao.getInstance().insert(createMemberDto);

        return this.dao.insert(createCommandDto);
    }
}
