import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [FilesController],
  providers: [FilesService, ConfigService],
  imports: [ConfigModule, UsersModule],
})
export class FilesModule {}
