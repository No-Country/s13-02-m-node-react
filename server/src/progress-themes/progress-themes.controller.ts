import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProgressThemesService } from './progress-themes.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProgressThemesDto } from './dto/create-progress-theme.dto';
import { AuthGuard } from '../auth/guards/auth.guards';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Progress Themes')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('progress-themes')
export class ProgressThemesController {
  constructor(private readonly progressThemesService: ProgressThemesService) {}

  @Post()
  public async addUserToTheme(
    @Body() createProgressThemeDto: CreateProgressThemesDto,
    @Req() req,
  ) {
    const { userAuth } = req;
    return this.progressThemesService.create(createProgressThemeDto, userAuth);
  }

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
