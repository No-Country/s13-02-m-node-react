import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { StacksService } from 'src/stacks/stacks.service';

@Global()
@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, StacksService],
})
export class AuthModule {}
