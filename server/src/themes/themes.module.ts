import { Module } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { ThemesController } from './themes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemesEntity } from './entities/theme.entity';
import { StacksModule } from 'src/stacks/stacks.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ThemesEntity]),
    StacksModule,
    UsersModule,
  ],
  controllers: [ThemesController],
  providers: [ThemesService],
  exports: [ThemesService, TypeOrmModule],
})
export class ThemesModule {}
