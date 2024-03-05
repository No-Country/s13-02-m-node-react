/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ValidationPipe,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PublicAccess } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { UsersService } from './users.service';
import { ROLES } from '../config/constants/roles';
import { ErrorManager } from '../utils/error.manager';
import { AuthGuard } from '../auth/guards/auth.guards';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { fileFilter } from 'src/files/helpers/fileFilter.helper';
import { fileNamer } from 'src/files/helpers/fileNamer.helper';
const isProduction = process.env.NODE_ENV === '.env';
// console.log(isProduction)

// console.log(
//   join(
//     __dirname,
//     isProduction ? '../../static/avatars' : '../../../static/avatars',
//   ),
// );

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async findMe(@Req() req) {
    const user = req.userAuth;
    return this.usersService.findUserById(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findUserById(id);
    if (!user) {
      throw new ErrorManager({
        type: 'NOT_FOUND',
        message: 'No user found',
      });
    }
    return this.usersService.findUserById(id);
  }

  @Get()
  @PublicAccess()
  findAll(@Query(new ValidationPipe({ transform: true })) query: UserQueryDto) {
    return this.usersService.findAll(query);
  }

  // modifiy username, avatar, notification, notificationchallenge
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: join(
          __dirname,
          isProduction ? '../../static/avatars' : '../../../static/avatars',
        ),
        filename: fileNamer,
      }),
      fileFilter: fileFilter,
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
    @Req() req: Request,
  ) {
    const { userAuth } = req;
    return this.usersService.update(id, updateUserDto, userAuth, avatar);
  }

  @Roles(ROLES.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
