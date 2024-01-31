import { AbstractNeDBDaoImpl } from "src/common/db/abstract.dao";
import { Member } from "../entity/member.entity";
import { CreateMemberDto } from "../dto/create-member.dto";
import { UpdateMemberDto } from "../dto/update-member.dto";

export class MembersDao extends AbstractNeDBDaoImpl<Member, CreateMemberDto, UpdateMemberDto>{
    private static instance: MembersDao;

    private constructor() {
        super('members');
    }

    public static getInstance(): MembersDao {
        if (!MembersDao.instance) {
            MembersDao.instance = new MembersDao();
        }
        return MembersDao.instance;
    }
}