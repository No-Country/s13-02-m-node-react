import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProgressThemesService } from './progress-themes.service';
import { CreateProgressThemeDto } from './dto/create-progress-theme.dto';
import { UpdateProgressThemeDto } from './dto/update-progress-theme.dto';

@Controller('progress-themes')
export class ProgressThemesController {
  constructor(private readonly progressThemesService: ProgressThemesService) {}

  @Post()
  create(@Body() createProgressThemeDto: CreateProgressThemeDto) {
    return this.progressThemesService.create(createProgressThemeDto);
  }

  @Get()
  findAll() {
    return this.progressThemesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.progressThemesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProgressThemeDto: UpdateProgressThemeDto,
  ) {
    return this.progressThemesService.update(+id, updateProgressThemeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.progressThemesService.remove(+id);
  }
}
