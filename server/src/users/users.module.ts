import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressStacksEntity } from './entities/progressStacks.entity';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { StacksService } from 'src/stacks/stacks.service';
import { StacksEntity } from 'src/stacks/entities/stack.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, ProgressStacksEntity, StacksEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthGuard, StacksService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
