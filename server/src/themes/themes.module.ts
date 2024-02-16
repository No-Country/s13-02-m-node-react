import { Module } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { ThemesController } from './themes.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ThemesController],
  providers: [ThemesService],
})
export class ThemesModule {}
