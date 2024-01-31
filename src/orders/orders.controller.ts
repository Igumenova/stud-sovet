import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Session,
  Res,
  Render,
  Put,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  CreateCommandDto,
  CreateMemberDto,
  CreateOrderDto,
} from './dto/create-order.dto';
import { FormDataRequest } from 'nestjs-form-data';
import {
  UpdateCommandDto,
  UpdateMemberDto,
  UpdateOrderDto,
} from './dto/update-order.dto';
import { Response } from 'express';
import { Track } from './data/stage.enum';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Render('client/pug/index')
  async home(@Session() session: Record<string, any>, @Res() res: Response) {
    return { orderIsSend: session.orderIsSend, Tracks: Track};
  }

  @Post('/addCommand')
  @FormDataRequest()
  async createCommand(
    @Body() createCommandDto: CreateCommandDto,
    @Res() res: Response,
    @Session() session: Record<string, any>,
  ) {
    await this.ordersService.addCommand(createCommandDto);
    session.orderIsSend = 1;
    res.status(302).redirect('/'); //вывод токена команды
  }

  @Post('/addMember')
  @FormDataRequest()
  async createMember(
    @Body() createMemberDto: CreateMemberDto,
    @Res() res: Response,
    @Session() session: Record<string, any>,
  ) {
    await this.ordersService.addMember(createMemberDto);
    session.orderIsSend = 1;
    res.status(302).redirect('/');
  }

  @Get('admin/login')
  @Render('admin/pug/login')
  async login() {
    return { error: false };
  }

  @Post('admin/login')
  @FormDataRequest()
  async checkToken(
    @Body() body: { token: string },
    @Res() res: Response,
    @Session() session: Record<string, any>,
  ) {
    if (body.token === process.env.TOKEN) {
      session.token = body.token;
      res.status(302).redirect('/admin/orders');
    } else {
      res.render('admin/pug/login', { error: true });
    }
  }

  @Get('admin/orders')
  async commands(
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    const commands = await this.ordersService.getAllCommands();
    return res.render('admin/pug/admin', { commands, host: process.env.HOST });
  }

  @Put('admin/orders/updateCommand')
  async updateCommand(
    @Body() updateCommandDto: UpdateCommandDto,
    @Res() res: Response,
  ) {
    try {
      console.log(updateCommandDto);
      await this.ordersService.updateCommand(
        updateCommandDto._id,
        updateCommandDto,
      );
      res.status(200).send();
    } catch (e: any) {
      res.status(502).send();
    }
  }

  @Put('admin/orders/updateMember')
  async updateMember(
    @Body() updateMemberDto: UpdateMemberDto,
    @Res() res: Response,
  ) {
    try {
      await this.ordersService.updateMember(
        updateMemberDto._id,
        updateMemberDto,
      );
      res.status(200).send();
    } catch (e: any) {
      res.status(502).send();
    }
  }

  @Delete('admin/orders/deleteCommand')
  async deleteCommand(
    @Body() updateCommandDto: UpdateCommandDto,
    @Res() res: Response,
  ) {
    // try {
    await this.ordersService.deleteCommand(updateCommandDto._id); //удаление мемберов команды, добавить
    res.status(200).send();
    // } catch (e: any) {
    //   res.status(502).send();
    // }
  }

  @Delete('admin/orders/deleteMember')
  async deleteMember(
    @Body() updateMemberDto: UpdateMemberDto,
    @Res() res: Response,
  ) {
    // try {
    await this.ordersService.deleteMember(updateMemberDto._id);
    res.status(200).send();
    // } catch (e: any) {
    //   res.status(502).send();
    // }
  }

  //ПЕРЕДЕЛЫВАААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААТЬ
  // @Put('admin/orders')
  // async updateOrder(
  //   @Body() updateOrderDto: UpdateOrderDto,
  //   @Res() res: Response,
  // ) {
  //   try {
  //     await this.ordersService.updateOrder(updateOrderDto._id, updateOrderDto);
  //     res.status(200).send();
  //   } catch (e: any) {
  //     res.status(502).send();
  //   }
  // }

  // @Delete('admin/orders')
  // async deleteOrder(
  //   @Body() updateOrderDto: UpdateOrderDto,
  //   @Res() res: Response,
  // ) {
  //   try {
  //     await this.ordersService.deleteOrder(updateOrderDto._id);
  //     res.status(200).send();
  //   } catch (e: any) {
  //     res.status(502).send();
  //   }
  // }

  @Get('admin/order/:id')
  @Render('admin/pug/order')
  async findOne(@Param('id') id: string) {
    const order = await this.ordersService.getCommandById(id);
    return { order, host: process.env.HOST };
  }
}
