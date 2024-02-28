/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OpenaiController } from './openai.controller';
import { OpenaiService } from './openai.service';
import { UsersModule } from 'src/users/users.module';
import { ProgressThemesModule } from 'src/progress-themes/progress-themes.module';

@Module({
  imports: [UsersModule, ProgressThemesModule],

  controllers: [OpenaiController],
  providers: [OpenaiService],
})
export class OpenaiModule {}
