/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  UseGuards,
  Query,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProgressStackDto } from './dto/create-progress-stack.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guards';
import { PublicAccess } from '../auth/decorators/public.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ROLES } from 'src/config/constants/roles';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserQueryDto } from './dto/theme-query.dto';
import { ErrorManager } from 'src/utils/error.manager';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add-stack') // Correct decorator with method name
  async addStackToUser(
    @Body() progressStackDto: CreateProgressStackDto,
    @Req() req,
  ) {
    const userAuth = req.userAuth;
    return this.usersService.addStackToUser(progressStackDto, userAuth);
  }

  @Get()
  @PublicAccess()
  findAll(@Query(new ValidationPipe({ transform: true })) query: UserQueryDto) {
    return this.usersService.findAll(query);
  }

  @Get('me')
  async findMe(@Req() req) {
    const user = req.userAuth;
    return this.usersService.findUserById(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findUserById(id);
    if (!user) {
      throw new ErrorManager({
        type: 'NOT_FOUND',
        message: 'No user found',
      });
    }
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

  // modifiy username, avatar, notification, notificationchallenge
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
  ) {
    const { userAuth } = req;
    return this.usersService.update(id, updateUserDto, userAuth);
  }

  @Roles(ROLES.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
