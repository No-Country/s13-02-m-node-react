import { Inject, Injectable } from '@nestjs/common';
import { CreateProgressStackDto } from './dto/create-progress-stack.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { InjectRepository } from '@nestjs/typeorm';
import { StacksService } from 'src/stacks/stacks.service';
import { ProgressStacksEntity } from './entities/progress-stack.entity';
import { UsersService } from 'src/users/users.service';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ProgressStacksService {
  constructor(
    @InjectRepository(ProgressStacksEntity)
    private readonly progressStackRepository: Repository<ProgressStacksEntity>,
    @Inject(UsersService)
    private userService: UsersService,
    @Inject(StacksService)
    private stacksService: StacksService,
  ) {}

  public async create(
    progressStackDto: CreateProgressStackDto,
    userAuth: { id: string; role: string },
  ) {
    try {
      if (userAuth.id !== progressStackDto.user && userAuth.role !== 'ADMIN') {
        throw new ErrorManager({
          type: 'FORBIDDEN',
          message: 'You have no privileges for perform this action',
        });
      } else {
        const stackUser = await this.userService.findOne(progressStackDto.user);
        if (!stackUser) {
          throw new ErrorManager({
            type: 'NOT_FOUND',
            message: " Id User wrong or doesn't exists",
          });
        }

        const stackAsigned = await this.stacksService.findOne(
          progressStackDto.stack,
        );
        if (!stackAsigned) {
          throw new ErrorManager({
            type: 'NOT_FOUND',
            message: " Stack wrong or doesn't exists",
          });
        }
        const newProgressStack = await this.progressStackRepository.save({
          user: stackUser,
          stack: stackAsigned,
        });

        return { id: newProgressStack.id };
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAllByUser(userId: string) {
    try {
      return await this.progressStackRepository.find({ where: { userId } });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOne(id: string, manager?: EntityManager) {
    try {
      if (manager) {
        return await manager.findOne(ProgressStacksEntity, {
          where: { id },
        });
      } else {
        return await this.progressStackRepository.findOne({
          where: { id },
        });
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
