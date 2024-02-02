import {
  Body,
  Controller,
  Post,
  Res,
  Session,
  Put,
  Delete,
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
    await this.membersService.addMember(createMemberDto);
    session.orderIsSend = 1;
    res.status(302).redirect('/');
  }

  @Put()
  async updateMember(
    @Body() updateMemberDto: UpdateMemberDto,
    @Res() res: Response,
  ) {
    try {
      this.membersService.updateMember(updateMemberDto._id, updateMemberDto);
      res.status(200).send();
    } catch (e: any) {
      res.status(502).send();
    }
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
