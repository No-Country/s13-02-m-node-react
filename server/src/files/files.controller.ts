import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { Multer, diskStorage } from 'multer';
import { FilesService } from './files.service';

import { fileFilter, fileNamer } from './helpers';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
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

  @Post('avatar')
  @UseInterceptors( FileInterceptor('file', {
    fileFilter: fileFilter,
    // limits: { fileSize: 4000 },
    storage: diskStorage({
      destination: './static/avatars',
      filename: fileNamer
    })
  }) )
  uploadAvatarImage(
    @UploadedFile() file: Express.Multer.File,
    ){

      if( !file ) {
        throw new BadRequestException('Make sure that the file  is an image');
      }
      
      const secureUrl = `${ this.configService.get('HOST_API') }/files/avatar/${ file.filename } `;
      
      return { secureUrl };
  }

}