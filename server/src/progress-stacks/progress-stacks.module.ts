import { Module } from '@nestjs/common';
import { ProgressStacksService } from './progress-stacks.service';
import { ProgressStacksController } from './progress-stacks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressStacksEntity } from './entities/progress-stack.entity';
import { UsersService } from 'src/users/users.service';
import { StacksService } from 'src/stacks/stacks.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProgressStacksEntity])],
  controllers: [ProgressStacksController],
  providers: [ProgressStacksService, UsersService, StacksService],
})
export class ProgressStacksModule {}
