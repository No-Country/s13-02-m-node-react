import { Module } from '@nestjs/common';
import { ProgressThemesService } from './progress-themes.service';
import { ProgressThemesController } from './progress-themes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressThemesEntity } from './entities/progress-theme.entity';
import { ProgressStacksModule } from 'src/progress-stacks/progress-stacks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProgressThemesEntity]),
    ProgressStacksModule,
  ],
  controllers: [ProgressThemesController],
  providers: [ProgressThemesService],
})
export class ProgressThemesModule {}
