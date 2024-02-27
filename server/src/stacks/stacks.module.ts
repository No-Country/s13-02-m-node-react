import { Module } from '@nestjs/common';
import { StacksService } from './stacks.service';
import { StacksController } from './stacks.controller';
import { StacksEntity } from './entities/stack.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([StacksEntity]), UsersModule],
  controllers: [StacksController],
  providers: [StacksService],
  exports: [StacksService, TypeOrmModule],
})
export class StacksModule {}
