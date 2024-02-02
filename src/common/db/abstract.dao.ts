import { INeDBDao } from './i.dao';
const NeDB = require('nedb-promises');

export abstract class AbstractNeDBDaoImpl<O, CreateDto, UpdateDto>
  implements INeDBDao<O, CreateDto, UpdateDto>
{
  private preffix: string;
  private db: any;

  constructor(preffix: string) {
    this.preffix = preffix;
    this.db = NeDB.create({
      filename: `db/${preffix}.db`,
      autoload: true,
    });
  }

  public update(filter: any, object: UpdateDto): Promise<number | O> {
    return this.db.updateOne(filter, object);
  }

  public getAll(): Promise<O[]> {
    return this.db.find({});
  }

  public getByFilter(filter: any): Promise<O> {
    return this.db.findOne(filter);
  }

  protected abstract identityCheck(object: CreateDto): Promise<boolean>;

  public async insert(object: CreateDto): Promise<string> {
    // if (await this.identityCheck(object)) {
    await this.db.insert(object);
    return this.getByFilter(object).then((e: O) => (e as { _id: string })._id);
    // }
  }

  public async deleteByFilter(filter: any): Promise<boolean> {
    await this.db.deleteOne(filter);
    return this.getByFilter(filter).then((e: O) => !e);
  }
}
