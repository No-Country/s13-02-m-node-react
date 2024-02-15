import { Module } from '@nestjs/common';
import { StacksService } from './stacks.service';
import { StacksController } from './stacks.controller';

@Module({
  controllers: [StacksController],
  providers: [StacksService],
})
export class StacksModule {}
