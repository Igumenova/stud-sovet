import { AbstractNeDBDaoImpl } from 'src/common/db/abstract.dao';
import { News } from '../entity/news.entity';
import { CreateNewsDto } from '../dto/create-news.dto';
import { UpdateNewsDto } from '../dto/update-news.dto';

export class NewsDao extends AbstractNeDBDaoImpl<
  News,
  CreateNewsDto,
  UpdateNewsDto
> {
  private static instance: NewsDao;

  private constructor() {
    super('news');
  }

  public static getInstance(): NewsDao {
    if (!NewsDao.instance) {
      NewsDao.instance = new NewsDao();
    }
    return NewsDao.instance;
  }
}
