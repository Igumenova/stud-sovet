import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Res,
  Session,
  Delete,
  Render,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Response } from 'express';
import { FormDataRequest } from 'nestjs-form-data';
import { CompositionService } from './composition.service';
import { CreateCompositionDto } from './dto/create-composition.dto';
import { UpdateCompositionDto } from './dto/update-composition.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('admin/composition')
export class CompositionController {
  constructor(private readonly compositionService: CompositionService) {}

  @Post('/addComposition')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/main/src',
        filename: (req, file, cb) => {
          const randomName = uuidv4() + extname(file.originalname);
          cb(null, `${randomName}`);
        },
      }),
    }),
  )
  async createComposition(
    @Body() regCompositionDto: CreateCompositionDto,
    @Res()
    res: Response,
    @Session() session: Record<string, any>,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const regResult = await this.compositionService.createComposition(
      regCompositionDto,
      file
    );
    session.orderIsSend = 1;
    res.status(302).redirect(process.env.HOST + '/admin/composition');
  }

  @Get()
  @Render('admin/panel/composition/composition_admin')
  async composition() {
    const allComposition = await this.compositionService.getAllComposition();
    return { allComposition, host: process.env.HOST };
  }

  @Get('/addComposition')
  @Render('admin/panel/composition/composition_add')
  async addComposition() {
    return { host: process.env.HOST };
  }

  @Get(':id')
  @Render('admin/panel/composition/composition')
  async findOne(@Param('id') id: string) {
    const composition = await this.compositionService.getCompositionById(id);
    return { composition, host: process.env.HOST };
  }

  @Delete()
  async deleteComposition(
    @Body() updateCompositionDto: UpdateCompositionDto,
    @Res() res: Response,
  ) {
    this.compositionService.deleteComposition(updateCompositionDto._id);
    return res.status(200).send();
  }

  @Put()
  async updateComposition(
    @Body() updateCompositionDto: UpdateCompositionDto,
    @Res() res: Response,
  ) {
    this.compositionService.updateComposition(
      updateCompositionDto._id,
      updateCompositionDto,
    );
    res.status(200).send();
  }
}
