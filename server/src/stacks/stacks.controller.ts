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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('stacks')
@UseGuards(AuthGuard)
@Controller('stacks')
export class StacksController {
  constructor(private readonly stacksService: StacksService) {}

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStackDto: UpdateStackDto) {
    return this.stacksService.update(+id, updateStackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stacksService.remove(+id);
  }
}
