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
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ThemesService } from './themes.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLES } from 'src/config/constants/roles';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { ThemeQueryDto } from './dto/theme-query.dto';

@ApiTags('themes')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Roles(ROLES.ADMIN)
  @Post()
  public async create(@Body() createThemeDto: CreateThemeDto) {
    return this.themesService.create(createThemeDto);
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
    console.log('id es undefined? ', id);
    return this.themesService.remove(id);
  }
}
