/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UsersEntity } from './entities/user.entity';
import { ErrorManager } from '../utils/error.manager';
import { ProgressStackDto } from './dto/progress-stack.dto';
import { ProgressStacksEntity } from './entities/progressStacks.entity';
import { RegisterAuthDto } from '../auth/dto/register-auth.dto';
import { TSearchConditions } from '../types/types/searchConditions';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(ProgressStacksEntity)
    private readonly progressStacksEntity: Repository<ProgressStacksEntity>,
  ) {}

  public async create(user: RegisterAuthDto): Promise<UsersEntity> {
    try {
      const newUser: UsersEntity = await this.userRepository.save(user);
      return newUser;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUserBy(options: TSearchConditions) {
    try {
      const user: UsersEntity = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where({ [options.field]: options.value })
        .getOne();

      if (!user) {
        return undefined;
      }
      return user;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAll(): Promise<UsersEntity[]> {
    try {
      const users: UsersEntity[] = await this.userRepository.find();
      if (users.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No users found',
        });
      }
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUserById(id: string): Promise<UsersEntity> {
    try {
      const user: UsersEntity = await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .leftJoinAndSelect('user.stacks', 'stacks')
        .leftJoinAndSelect('stacks.stack', 'stack')
        .leftJoinAndSelect('stack.themes', 'themes')
        .getOne();
      if (!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No user found',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult | undefined> {
    try {
      const user: UpdateResult = await this.userRepository.update(
        id,
        updateUserDto,
      );
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Cant update - No user found',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async remove(id: string): Promise<DeleteResult | undefined> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Cant delete - No user found',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async addStack(progressStackDto: ProgressStackDto) {
    return `agrega stack al usuario: ${progressStackDto}`;
  }
  public async getOneUserStack(userId: string, stackId: string) {
    return `agrega stack al usuario: ${userId}, ${stackId}`;
  }
  public async getAllUserStack(userId: string) {
    return `agrega stack al usuario: ${userId}`;
  }
}
