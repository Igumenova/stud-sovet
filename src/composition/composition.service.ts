import { Injectable } from '@nestjs/common';
import { CompositionDao } from './dao/compositiondao';
import { Composition } from './entity/composition.entity';
import { UpdateCompositionDto } from './dto/update-composition.dto';
import { CreateCompositionDto } from './dto/create-composition.dto';

@Injectable()
export class CompositionService {
  private dao: CompositionDao;

  constructor() {
    this.dao = CompositionDao.getInstance();
  }

  getCompositionById(_id: string): Promise<Composition> {
    return this.dao.getByFilter({ _id });
  }

  getCompositionByDepartment(departament: string): Promise<Composition[]> {
    return this.dao.getAllByFilter({ departament });
  }

  async deleteComposition(_id: string): Promise<boolean> {
    return this.dao.deleteByFilter({ _id });
  }

  async updateComposition(
    _id: string,
    newComposition: UpdateCompositionDto,
  ): Promise<number | Composition> {
    const oldComposition = (await this.getCompositionById(
      _id,
    )) as UpdateCompositionDto;
    for (const key of Object.keys(newComposition)) {
      oldComposition[key] = newComposition[key];
    }
    return this.dao.update({ _id }, oldComposition);
  }

  getAllComposition(): Promise<Composition[]> {
    return this.dao.getAll();
  }

  async createComposition(
    composition: CreateCompositionDto,
    file: Express.Multer.File,
  ): Promise<string> {
    composition.date = new Date();
    composition.file = file.filename;
    this.dao.insert(composition);
    return 'true';
  }
}
