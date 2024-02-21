import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StacksService } from './stacks.service';
import { CreateStackDto } from './dto/create-stack.dto';
import { UpdateStackDto } from './dto/update-stack.dto';
import { PublicAccess } from '../auth/decorators/public.decorator';
import { AuthGuard } from '../auth/guards/auth.guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLES } from '../config/constants/roles';

@ApiTags('stacks')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('stacks')
export class StacksController {
  constructor(private readonly stacksService: StacksService) {}

  @Roles(ROLES.ADMIN)
  @Post()
  create(@Body() createStackDto: CreateStackDto) {
    return this.stacksService.create(createStackDto);
  }

  @PublicAccess()
  @Get()
  findAll() {
    return this.stacksService.findAll();
  }

  @PublicAccess()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stacksService.findOne(+id);
  }

  @Roles(ROLES.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStackDto: UpdateStackDto) {
    return this.stacksService.update(+id, updateStackDto);
  }

  @Roles(ROLES.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stacksService.remove(+id);
  }
}
