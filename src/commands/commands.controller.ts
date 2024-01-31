import { Body, Controller, Get, Post, Put, Res, Session, Delete, Render, Param } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { FormDataRequest } from 'nestjs-form-data';
import { Response } from 'express';
import { UpdateCommandDto } from './dto/update-command.dto';
import { RegisterCommandDto } from './dto/register-command.dto';
import { Exception } from 'sass';

/**
 * TODO: переписать pug
 */
@Controller('admin/commands')
export class CommandsController {
    constructor(private readonly commandsService: CommandsService) { }

    @Post()
    @FormDataRequest()
    async createCommand(
        @Body() regCommandDto: RegisterCommandDto,
        @Res() res: Response,
        @Session() session: Record<string, any>,
    ) {
        const token = await this.commandsService.regCommand(regCommandDto);
        session.orderIsSend = 1;
        res.status(302).redirect('/showtoken?token=' + token); //вывод токена команды
    }

    @Get()
    @Render('admin/pug/admin')
    async commands() {
        const commands = this.commandsService.getAllCommands();
        return { commands, host: process.env.HOST };
    }

    @Get(':id')
    @Render('admin/pug/order')
    async findOne(@Param('id') id: string) {
        const command = await this.commandsService.getCommandById(id);
        return { command, host: process.env.HOST };
    }

    @Put()
    async updateCommand(
        @Body() updateCommandDto: UpdateCommandDto,
        @Res() res: Response,
    ) {
        console.log(updateCommandDto);
        this.commandsService.updateCommand(
            updateCommandDto._id,
            updateCommandDto
        );
        res.status(200).send();
    }

    @Delete()
    async deleteCommand(
        @Body() updateCommandDto: UpdateCommandDto,
        @Res() res: Response,
    ) {
        const resultOperation = await this.commandsService.deleteCommand(updateCommandDto._id);
        if (resultOperation) {
            return res.status(200).send();
        } else {
            return res.status(403).send('Ошибка удаления команды');
        }
    }
}
