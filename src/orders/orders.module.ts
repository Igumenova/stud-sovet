import {
  Module
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [NestjsFormDataModule.config({ storage: MemoryStoredFile })],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule { }
