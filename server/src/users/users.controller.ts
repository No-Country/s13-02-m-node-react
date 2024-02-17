import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProgressStackDto } from './dto/progress-stack.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { PublicAccess } from 'src/auth/decorators/public.decorator';

@ApiTags('users')
@UseGuards(AuthGuard)
@Controller() // preguntar no se usaba controller decorator 
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add-stack')
  public async create(@Body() progressStackDto: ProgressStackDto) {
    return this.usersService.addStack(progressStackDto);
  }

  @Get()
  @PublicAccess()
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
