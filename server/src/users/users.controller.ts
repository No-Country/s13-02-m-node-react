import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProgressStackDto } from './dto/progress-stack.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add-stack')
  public async create(@Body() progressStackDto: ProgressStackDto) {
    return this.usersService.addStack(progressStackDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Get(':userid/stack/all')
  public async findUserStacks(@Param('userid') userId: string) {
    return this.usersService.getAllUserStack(userId);
  }

  @Get(':userid/stack/:id')
  public async findOneUsertStack(
    @Param('userid') userId: string,
    @Param('id') stackId: string,
  ) {
    return this.usersService.getOneUserStack(userId, stackId);
  }

  @Post('stack')
  public async addUserStack(@Body() progressStackDto: ProgressStackDto) {
    return this.usersService.addStack(progressStackDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
