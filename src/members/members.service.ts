import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MembersDao } from './dao/members.dao';
import { Member } from './entity/member.entity';
import { CommandsDao } from 'src/commands/dao/commands.dao';
import { Command } from 'src/commands/entity/command.entity';
import { Exception } from 'sass';

@Injectable()
export class MembersService {
    private dao: MembersDao;

    constructor() {
        this.dao = MembersDao.getInstance();
    }
    deleteMember(_id: string): Promise<boolean> {
        return this.dao.deleteByFilter({ _id });
    }
    updateMember(_id: string, command: UpdateMemberDto): Promise<number | Member> {
        return this.dao.update({ _id }, command);
    }

    async addMember(createMemberDto: CreateMemberDto) {
        const commandToken = createMemberDto.commandToken;

        const command: Command = await CommandsDao.getInstance().getByFilter(commandToken)
        if (!command) {
            // TODO создать NotMatchTokenException и фильторок к нему
            throw new NotFoundException('Кастомный exception для несовпадения token');
        }

        return this.dao.insert(createMemberDto);
    }

}
