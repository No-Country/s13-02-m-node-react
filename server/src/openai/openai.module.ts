/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OpenaiController } from './openai.controller';
import { OpenaiService } from './openai.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [OpenaiController],
  providers: [OpenaiService],
})
export class OpenaiModule {}
