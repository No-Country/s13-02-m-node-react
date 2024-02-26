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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard, RolesGuard, PublicAccess, Roles } from '../auth';
import { UsersService } from './users.service';
import { UpdateUserDto, UserQueryDto } from './dto';
import { CreateProgressStackDto } from '../progress-stacks/dto';
import { ROLES } from '../config/constants';
import { ErrorManager } from '../utils/error.manager';

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

  @Get()
  @PublicAccess()
  findAll(@Query(new ValidationPipe({ transform: true })) query: UserQueryDto) {
    return this.usersService.findAll(query);
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

  // @Patch('remove-life')
  // async removeLife(@Req() req) {
  //   const { userAuth } = req;
  //   return this.usersService.removeLife(userAuth.id);
  // }

  @Roles(ROLES.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
