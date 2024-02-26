import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProgressStacksService } from './progress-stacks.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Progress Stacks')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('progress-stacks')
export class ProgressStacksController {
  constructor(private readonly progressStacksService: ProgressStacksService) {}

  @Get('user/:userId')
  public async findAllByUser(@Param('userId') userId: string) {
    return this.progressStacksService.findAllByUser(userId);
  }

  @Get(':stackId')
  public async findOne(@Param('stackId') id: string) {
    return this.progressStacksService.findOne(id);
  }

  // borrar?
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.progressStacksService.remove(+id);
  // }
}
