import { AbstractNeDBDaoImpl } from 'src/common/db/abstract.dao';
import { Composition } from '../entity/composition.entity';
import { CreateCompositionDto } from '../dto/create-composition.dto';
import { UpdateCompositionDto } from '../dto/update-composition.dto';

export class CompositionDao extends AbstractNeDBDaoImpl<
Composition,
  CreateCompositionDto,
  UpdateCompositionDto
> {
  private static instance: CompositionDao;

  private constructor() {
    super('composition');
  }

  public static getInstance(): CompositionDao {
    if (!CompositionDao.instance) {
      CompositionDao.instance = new CompositionDao();
    }
    return CompositionDao.instance;
  }
}
