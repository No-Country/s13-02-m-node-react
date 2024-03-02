import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
@Module({
  imports: [
    MulterModule.register({
      dest: join(__dirname, '..', '..', 'static'),
    }),
  ],
  controllers: [],
  providers: [FilesService],
})
export class FilesModule {}
