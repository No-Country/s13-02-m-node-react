import { Module } from '@nestjs/common';
import { ProgressThemesService } from './progress-themes.service';
import { ProgressThemesController } from './progress-themes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressThemesEntity } from './entities/progress-theme.entity';
import { UsersModule } from 'src/users/users.module';
import { ThemesModule } from 'src/themes/themes.module';
import { ProgressStacksModule } from 'src/progress-stacks/progress-stacks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProgressThemesEntity]),
    UsersModule,
    ProgressStacksModule,
    ThemesModule,
  ],
  controllers: [ProgressThemesController],
  providers: [ProgressThemesService],
  exports: [ProgressThemesService, TypeOrmModule],
})
export class ProgressThemesModule {}
