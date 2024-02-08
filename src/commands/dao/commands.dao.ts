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

  public static getInstance(): CommandsDao {
    if (!CommandsDao.instance) {
      CommandsDao.instance = new CommandsDao();
    }
    return CommandsDao.instance;
  }
}
