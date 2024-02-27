import { Controller, Get, Param } from '@nestjs/common';
import { ProgressThemesService } from './progress-themes.service';

@Controller('progress-themes')
export class ProgressThemesController {
  constructor(private readonly progressThemesService: ProgressThemesService) {}

  @Get('/stack/:id')
  async findAll(@Param('id') id: string) {
    return this.progressThemesService.findAllByStackProgress(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.progressThemesService.findOne(id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.progressThemesService.remove(+id);
  // }
}
