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
import { CreateThemeDto, UpdateThemeDto, ThemeQueryDto } from './dto';
import { AuthGuard, RolesGuard } from '../auth/guards';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLES } from 'src/config/constants/roles';
import { CreateProgressThemesDto } from 'src/progress-themes/dto';
import { PublicAccess } from 'src/auth/decorators/public.decorator';

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

  @Post('add-to-user')
  public async addUserToTheme(
    @Body() createProgressThemeDto: CreateProgressThemesDto,
    @Req() req,
  ) {
    const { userAuth } = req;
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

  // @Patch('add-experience/:idTheme')
  // updateThemeProgress(
  //   @Param('idTheme') id: string,
  //   @Body() updateProgress: UpdateProgressThemeDto,
  // ) {
  //   return this.themesService.updateThemeProgress(id, updateProgress);
  // }

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
