import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StacksService } from './stacks.service';
import { CreateStackDto } from './dto/create-stack.dto';
import { UpdateStackDto } from './dto/update-stack.dto';

@Controller('stacks')
export class StacksController {
  constructor(private readonly stacksService: StacksService) {}

  @Post()
  create(@Body() createStackDto: CreateStackDto) {
    return this.stacksService.create(createStackDto);
  }

  @Get()
  findAll() {
    return this.stacksService.findAll();
  }

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
