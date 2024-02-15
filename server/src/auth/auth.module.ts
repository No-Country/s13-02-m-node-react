import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/entities/user.entity';
import { ProgressStacksEntity } from 'src/users/entities/progressStacks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, ProgressStacksEntity])],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
