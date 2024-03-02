import { existsSync } from 'fs';
import { join } from 'path';
import * as fs from 'node:fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  getStaticAvatarImage(imageName: string) {
    const path = join(__dirname, '..', '..', 'static', 'avatars', imageName);

    if (!existsSync(path))
      throw new Error(`No avatar found with image ${imageName}`);

    return path;
  }

  public async upload(file: Express.Multer.File) {
    const response = {
      originalName: file.originalname,
      fileName: file.filename,
    };
    return response;
  }

  remove(filename: string) {
    const filePath = join(__dirname, '..', '..', 'static', 'avatar', filename);
    try {
      fs.access(filePath, fs.constants.R_OK, (err) => {
        if (err) {
          console.error(`No Read access at ${filePath}`);
        } else {
          fs.unlink(filePath, (error) => {
            throw new Error(error.message);
          });
        }
      });
      return { message: 'file deleted' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
