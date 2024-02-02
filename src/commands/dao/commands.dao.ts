import { AbstractNeDBDaoImpl } from 'src/common/db/abstract.dao';
import { Command } from '../entity/command.entity';
import { CreateCommandDto } from '../dto/create-command.dto';
import { UpdateCommandDto } from '../dto/update-command.dto';

export class CommandsDao extends AbstractNeDBDaoImpl<
  Command,
  CreateCommandDto,
  UpdateCommandDto
> {
  private static instance: CommandsDao;

  private constructor() {
    super('commands');
  }

  protected async identityCheck(object: CreateCommandDto): Promise<boolean> {
    if (await this.getByFilter({ teamName: object.teamName })) {
      console.log(1);
      return false;
    }
    return true;
  }

  public static getInstance(): CommandsDao {
    if (!CommandsDao.instance) {
      CommandsDao.instance = new CommandsDao();
    }
    return CommandsDao.instance;
  }
}
