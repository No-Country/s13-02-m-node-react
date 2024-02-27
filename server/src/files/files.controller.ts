import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, Res, Req, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { Multer, diskStorage } from 'multer';
import { FilesService } from './files.service';

import { fileFilter, fileNamer } from './helpers';
import { UsersService } from '../users/users.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard, RolesGuard } from 'src/auth';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    ) {}

  @Get('avatar/:imageName')
  findAvatarImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {
    
    const path = this.filesService.getStaticAvatarImage( imageName );

    res.sendFile( path );
    
    return path;
  }

  @Post(':userId/avatar')
  @UseInterceptors( FileInterceptor('file', {
    fileFilter: fileFilter,
    // limits: { fileSize: 4000 },
    storage: diskStorage({
      destination: './static/avatars',
      filename: fileNamer
    })
  }))
  async uploadAvatarImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') userId: string,
    @Req() req
    ){
      if( !file ) {
        throw new BadRequestException('Make sure that the file  is an image');
      }
      
      const secureUrl = `${ this.configService.get('HOST_API') }/files/${userId}/avatar/${ file.filename } `;

      const user = req.user;
      const userAuth = { role: user.role, id: user.id };
      
      if(userId !== user.id) {
        throw new BadRequestException('User ID in the URL does not match the authenticated user ID');
      }

      const userEntity = await this.usersService.findUserById(user.id);

      const updateUserDto: UpdateUserDto = {
        username: userEntity.username,
        role: userEntity.role,
        life: userEntity.life,
        totalPoints: userEntity.totalPoints,
        challengeNotification: userEntity.challengeNotification,
        notification: userEntity.notification,
        avatarUrl: secureUrl,
      };

      await this.usersService.update(user.id, updateUserDto, userAuth);
      
      return { secureUrl };
  }

}