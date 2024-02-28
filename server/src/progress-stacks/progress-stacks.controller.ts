import {
  Body,
  Controller,
  // Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProgressStacksService } from './progress-stacks.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateProgressStackDto } from './dto/create-progress-stack.dto';

@ApiTags('Progress Stacks')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('progress-stacks')
export class ProgressStacksController {
  constructor(private readonly progressStacksService: ProgressStacksService) {}

  @Post('add') // Correct decorator with method name
  async addStackToUser(
    @Req() req,
    @Body() createProgressStack: CreateProgressStackDto,
  ) {
    const userAuth = req.userAuth;
    return this.progressStacksService.create(createProgressStack, userAuth);
  }

  @Get('user/:userId')
  public async findAllByUser(@Param('userId') userId: string) {
    return this.progressStacksService.findAllByUser(userId);
  }

  @Get(':stackId')
  public async findOne(@Param('stackId') id: string) {
    return this.progressStacksService.findOne(id);
  }
}
