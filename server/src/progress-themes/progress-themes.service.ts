import { Injectable } from '@nestjs/common';
import { CreateProgressThemeDto } from './dto/create-progress-theme.dto';
import { UpdateProgressThemeDto } from './dto/update-progress-theme.dto';

@Injectable()
export class ProgressThemesService {
  create(createProgressThemeDto: CreateProgressThemeDto) {
    return 'This action adds a new progressTheme';
  }

  findAll() {
    return `This action returns all progressThemes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} progressTheme`;
  }

  update(id: number, updateProgressThemeDto: UpdateProgressThemeDto) {
    return `This action updates a #${id} progressTheme`;
  }

  remove(id: number) {
    return `This action removes a #${id} progressTheme`;
  }
}
