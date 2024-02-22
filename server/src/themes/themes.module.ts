import { Module } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { ThemesController } from './themes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemesEntity } from './entities/theme.entity';
import { StacksEntity } from 'src/stacks/entities/stack.entity';
import { UsersModule } from 'src/users/users.module';
import { StacksService } from 'src/stacks/stacks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ThemesEntity, StacksEntity]),
    UsersModule,
  ],
  controllers: [ThemesController],
  providers: [ThemesService, StacksService],
})
export class ThemesModule {}
