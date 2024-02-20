import {
  Body,
  Controller,
  Post,
  Res,
  Session,
  Put,
  Delete,
  Get,
  Render,
  Param,
} from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { Response } from 'express';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('admin/members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @FormDataRequest()
  async createMember(
    @Body() createMemberDto: CreateMemberDto,
    @Res() res: Response,
    @Session() session: Record<string, any>,
  ) {
    const regResult = await this.membersService.addMember(createMemberDto);
    session.orderIsSend = 1;
    session.message = regResult;
    session.commandToken = '';
    res.status(302).redirect('/#message');
  }

  @Get()
  @Render('admin/pug/members/members_admin')
  async members() {
    const members = await this.membersService.getAllMember();
    return { members, host: process.env.HOST };
  }

  @Get(':id')
  @Render('admin/pug/members/member')
  async findOne(@Param('id') id: string) {
    const member = await this.membersService.getMemberById(id);
    return { member, host: process.env.HOST };
  }

  @Put()
  async updateMember(
    @Body() updateMemberDto: UpdateMemberDto,
    @Res() res: Response,
  ) {
    this.membersService.updateMember(updateMemberDto._id, updateMemberDto);
    res.status(200).send();
  }

  @Delete()
  async deleteMember(
    @Body() updateMemberDto: UpdateMemberDto,
    @Res() res: Response,
  ) {
    this.membersService.deleteMember(updateMemberDto._id);
    res.status(200).send();
  }
}
