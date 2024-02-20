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
} from '@nestjs/common';
import { CommandsService } from './commands.service';
import { FormDataRequest } from 'nestjs-form-data';
import { Response } from 'express';
import { UpdateCommandDto } from './dto/update-command.dto';
import { RegisterCommandDto } from './dto/register-command.dto';

@Controller('admin/commands')
export class CommandsController {
  constructor(private readonly commandsService: CommandsService) {}

  @Post()
  @FormDataRequest()
  async createCommand(
    @Body() regCommandDto: RegisterCommandDto,
    @Res() res: Response,
    @Session() session: Record<string, any>,
  ) {
    const regResult = await this.commandsService.regCommand(regCommandDto);
    session.orderIsSend = 1;
    if (regResult.includes('-')) {
      session.commandToken = regResult;
      session.message =
        'Это токен вашей команды, он понадобится для регистрации остальных участников. Сохраните его и отправьте остальным участникам команды.';
    } else {
      session.message = regResult;
    }
    res.status(302).redirect('/#message');
  }

  @Get()
  @Render('admin/pug/commands/commands_admin')
  async commands() {
    const commands = await this.commandsService.getAllCommands();
    return { commands, host: process.env.HOST };
  }

  @Get(':id')
  @Render('admin/pug/commands/command')
  async findOne(@Param('id') id: string) {
    const command = await this.commandsService.getCommandById(id);
    return { command, host: process.env.HOST };
  }

  @Put()
  async updateCommand(
    @Body() updateCommandDto: UpdateCommandDto,
    @Res() res: Response,
  ) {
    this.commandsService.updateCommand(updateCommandDto._id, updateCommandDto);
    res.status(200).send();
  }

  @Delete()
  async deleteCommand(
    @Body() updateCommandDto: UpdateCommandDto,
    @Res() res: Response,
  ) {
    
    this.commandsService.deleteCommand(updateCommandDto._id);
    return res.status(200).send();
  }
}
