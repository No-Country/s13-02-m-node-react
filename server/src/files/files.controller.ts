import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, Res, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { Multer, diskStorage } from 'multer';
import { FilesService } from './files.service';
import { fileFilter, fileNamer } from './helpers';
import { UsersService } from '../users/users.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth';

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

  @Patch(':userId/avatar')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/avatars',
      filename: fileNamer
    })
}))
async uploadAvatarImage(
  @UploadedFile() file: Express.Multer.File,
  @Param('userId') userId: string,
  @Req() req
) {
  if (!file) {
    throw new BadRequestException('Make sure that the file is an image');
  }

  const secureUrl = `${this.configService.get('HOST_API')}/files/avatar/${file.filename}`;

  const user = req.userAuth;
  // console.log(user)
  if (!user) {
    console.log('User is not authenticated');
    throw new UnauthorizedException('User is not authenticated');
  }
  if (userId !== user.id) {
    throw new BadRequestException('User ID in the URL does not match the authenticated user ID');
  }

    // const userEntity = await this.usersService.findUserById(user.id);

    // const updateUserDto: UpdateUserDto = {
    //   username: userEntity.username,
    //   role: userEntity.role,
    //   life: userEntity.life,
    //   totalPoints: userEntity.totalPoints,
    //   challengeNotification: userEntity.challengeNotification,
    //   notification: userEntity.notification,
    //   avatarUrl: secureUrl,
    // };

    await this.usersService.updateAvatar(user.id, secureUrl, user);

    return { avatarUrl: secureUrl };
}

}