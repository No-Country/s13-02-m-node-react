import { Module } from '@nestjs/common';
import { ProgressThemesService } from './progress-themes.service';
import { ProgressThemesController } from './progress-themes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressThemesEntity } from './entities/progress-theme.entity';
import { ProgressStacksService } from 'src/progress-stacks/progress-stacks.service';
import { ThemesService } from 'src/themes/themes.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProgressThemesEntity])],
  controllers: [ProgressThemesController],
  providers: [ProgressThemesService, ProgressStacksService, ThemesService],
})
export class ProgressThemesModule {}
