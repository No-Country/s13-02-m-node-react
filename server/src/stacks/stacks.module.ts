import { Module } from '@nestjs/common';
import { StacksService } from './stacks.service';
import { StacksController } from './stacks.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [StacksController],
  providers: [StacksService],
})
export class StacksModule {}
