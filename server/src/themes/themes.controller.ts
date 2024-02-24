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
import { ThemesService } from './themes.service';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ROLES } from 'src/config/constants/roles';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ThemeQueryDto } from './dto/theme-query.dto';
@ApiTags('themes')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Roles(ROLES.ADMIN)
  @Post()
  create(@Body() createThemeDto: CreateThemeDto) {
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
