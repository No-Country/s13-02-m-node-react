import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/filefilter.helper';
import { Multer } from 'multer';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('avatar')
  @UseInterceptors( FileInterceptor('file', {
    fileFilter: fileFilter
  }) )
  uploadAvatarImage(
    @UploadedFile() file: Express.Multer.File,
    ){

      if( !file ) {
        throw new BadRequestException('Make sure that the file  is an image');
      }

      return {
        fieldname: file.originalname
      };
  }

}