import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProgressThemesService } from './progress-themes.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard, RolesGuard } from 'src/auth/guards';

@ApiTags('Progress Themes')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
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
