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
import { Track } from '../commands/data/stage.enum';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

}
