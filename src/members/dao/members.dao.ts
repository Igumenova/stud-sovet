import { AbstractNeDBDaoImpl } from 'src/common/db/abstract.dao';
import { Member } from '../entity/member.entity';
import { CommandsDao } from 'src/commands/dao/commands.dao';
import { CreateMemberDto } from '../dto/create-member.dto';
import { UpdateMemberDto } from '../dto/update-member.dto';

export class MembersDao extends AbstractNeDBDaoImpl<
  Member,
  CreateMemberDto,
  UpdateMemberDto
> {
  private static instance: MembersDao;

  private constructor() {
    super('members');
  }

  protected async identityCheck(object: CreateMemberDto): Promise<boolean> {
    if (!await this.getByFilter({ commandToken: object.commandToken })) {
      console.log(2);
      return false;
    }
    // if (this.getByFilter(object.email)) {
    //   console.log(this.getByFilter(object.email));
    //   return false;
    // }
    // if (this.getByFilter(object.tel)) {
    //   console.log(3);
    //   return false;
    // }
    // if (!CommandsDao.getInstance().getByFilter(object.commandToken)) {
    //   console.log(3);
    //   return false;
    // }
    return true;
  }

  public static getInstance(): MembersDao {
    if (!MembersDao.instance) {
      MembersDao.instance = new MembersDao();
    }
    return MembersDao.instance;
  }
}
