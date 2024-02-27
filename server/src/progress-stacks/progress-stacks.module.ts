import { Module } from '@nestjs/common';
import { ProgressStacksService } from './progress-stacks.service';
import { ProgressStacksController } from './progress-stacks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressStacksEntity } from './entities/progress-stack.entity';
import { StacksModule } from 'src/stacks/stacks.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProgressStacksEntity]),
    UsersModule,
    StacksModule,
  ],
  controllers: [ProgressStacksController],
  providers: [ProgressStacksService],
  exports: [ProgressStacksService, TypeOrmModule, UsersModule],
})
export class ProgressStacksModule {}
