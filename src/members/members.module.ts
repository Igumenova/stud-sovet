import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [NestjsFormDataModule.config({ storage: MemoryStoredFile })],
  providers: [MembersService],
  controllers: [MembersController]
})
export class MembersModule {}
