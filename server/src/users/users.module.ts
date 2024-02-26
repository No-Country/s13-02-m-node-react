import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { StacksEntity } from 'src/stacks/entities/stack.entity';
import { ProgressStacksService } from 'src/progress-stacks/progress-stacks.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, StacksEntity])],
  controllers: [UsersController],
  providers: [UsersService, AuthGuard, ProgressStacksService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
