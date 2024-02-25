import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ThemesService } from './themes.service';
import {
  CreateThemeDto,
  UpdateThemeDto,
  ThemeQueryDto,
  CreateProgressThemesDto,
  UpdateProgressThemeDto,
} from './dto';

import { AuthGuard, PublicAccess, RolesGuard, Roles } from '../auth';
import { ROLES } from 'src/config/constants/roles';

@ApiTags('themes')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Roles(ROLES.ADMIN)
  @Post()
  public async create(@Body() createThemeDto: CreateThemeDto) {
    console.log('creating theme');
    return this.themesService.create(createThemeDto);
  }

  @Post('user/add')
  public async addUserToTheme(
    @Body() createProgressThemeDto: CreateProgressThemesDto,
    @Req() req,
  ) {
    console.log('adding theme to user');
    const { userAuth } = req;
    console.log('adding theme to user');
    return this.themesService.addThemeToUser(createProgressThemeDto, userAuth);
  }

  @PublicAccess()
  @Get()
  findAll(
    @Query(new ValidationPipe({ transform: true })) query: ThemeQueryDto,
  ) {
    return this.themesService.findAll(query);
  }

  @PublicAccess()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.themesService.findById(id);
  }

  @Patch('add-experience/:idTheme')
  updateThemeProgress(
    @Param('idTheme') id: string,
    @Body() updateProgress: UpdateProgressThemeDto,
  ) {
    return this.themesService.updateThemeProgress(id, updateProgress);
  }

  @Roles(ROLES.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThemeDto: UpdateThemeDto) {
    return this.themesService.update(id, updateThemeDto);
  }

  @Roles(ROLES.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.themesService.remove(id);
  }
}
