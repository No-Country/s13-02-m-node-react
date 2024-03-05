import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
const isProduction = process.env.NODE_ENV === '.env';
// console.log(
//   join(
//     __dirname,
//     isProduction ? '../../static/avatars' : '../../../static/avatars',
//   ),
// );
@Module({
  imports: [
    MulterModule.register({
      dest: join(
        __dirname,
        isProduction ? '../../static/avatars' : '../../../static/avatars',
      ),
    }),
  ],
  controllers: [],
  providers: [FilesService],
})
export class FilesModule {}
