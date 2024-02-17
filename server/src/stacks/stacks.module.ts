import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StacksService } from './stacks.service';
import { StacksController } from './stacks.controller';
import { StacksEntity } from './entities/stack.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StacksEntity])],
  controllers: [StacksController],
  providers: [StacksService],
  exports: [StacksService]
})
export class StacksModule {}
