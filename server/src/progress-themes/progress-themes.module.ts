import { Module } from '@nestjs/common';
import { ProgressThemesService } from './progress-themes.service';
import { ProgressThemesController } from './progress-themes.controller';

@Module({
  controllers: [ProgressThemesController],
  providers: [ProgressThemesService],
})
export class ProgressThemesModule {}
