/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UsersEntity } from './entities/user.entity';
import { ErrorManager } from '../utils/error.manager';
import { CreateProgressStackDto } from './dto/create-progress-stack.dto';
import { ProgressStacksEntity } from './entities/progressStacks.entity';
import { RegisterAuthDto } from '../auth/dto/register-auth.dto';
import { TSearchConditions } from '../types/types/searchConditions';
import { hash } from 'bcrypt';
import { UserQueryDto } from './dto/theme-query.dto';
import { StacksService } from 'src/stacks/stacks.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(ProgressStacksEntity)
    private readonly progressStacksRepository: Repository<ProgressStacksEntity>,
    @Inject(StacksService)
    private stacksService: StacksService,
  ) {}

  /**
   * @service Creates a new user based on the provided registration data.
   * @param user An object containing user registration data.
   * @returns The ID of the newly created user.
   * @throws ErrorManager.createSignatureError if there is an unexpected error during the process.
   * @throws ErrorManager with type 'BAD_REQUEST' and a message if the provided email or username is already in use.
   */
  public async create(user: RegisterAuthDto): Promise<string> {
    try {
      const isEmail = await this.findUserBy({
        field: 'email',
        value: user.email,
      });

      if (isEmail) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Email already in use',
        });
      }

      const isUsername = await this.findUserBy({
        field: 'username',
        value: user.username,
      });

      if (isUsername) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Username already in use',
        });
      }

      user.password = await hash(user.password, 10);

      const newUser: UsersEntity = await this.userRepository.save(user);

      return newUser.id;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAll(query: UserQueryDto): Promise<{
    data: UsersEntity[];
    pagination?: { totalPages: number; limit: number; page: number };
  }> {
    try {
      const { page, limit, orderBy, order } = query;
      const queryBuilder = this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.stacks', 'stacks')
        .leftJoinAndSelect('stacks.stack', 'stack')
        .addSelect(['user', 'user.username', 'stack.id', 'stack.name']);
      if (order && orderBy) {
        queryBuilder.orderBy(`user.${orderBy}`, order);
      }

      if (page && limit) {
        const askedPage = +page;
        const definedLimit = +limit;
        const totalCount = await queryBuilder.getCount();
        const totalPages = Math.ceil(totalCount / definedLimit);
        queryBuilder.skip((askedPage - 1) * definedLimit).take(definedLimit);
        const data = await queryBuilder.getMany();
        if (data.length === 0) {
          throw new ErrorManager({
            type: 'NOT_FOUND',
            message: 'No users found',
          });
        }
        return {
          data,
          pagination: { totalPages, limit: definedLimit, page: askedPage },
        };
      }

      const data = await queryBuilder.getMany();
      if (data.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No users found',
        });
      }
      return { data };
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
        .getOne();
      if (!user) {
        return undefined;
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

  public async addStackToUser(
    progressStackDto: CreateProgressStackDto,
    userAuth,
  ) {
    try {
      if (userAuth.id !== progressStackDto.user && userAuth.role !== 'ADMIN') {
        throw new ErrorManager({
          type: 'FORBIDDEN',
          message: 'You have no privileges for perform this action',
        });
      } else {
        const stackUser = await this.userRepository.findOne({
          where: { id: progressStackDto.user },
        });
        if (!stackUser) {
          throw new ErrorManager({
            type: 'NOT_FOUND',
            message: " Id User wrong or doesn't exists",
          });
        }
        const stackAsigned = await this.stacksService.findStackById(
          progressStackDto.stack,
        );
        if (!stackAsigned) {
          throw new ErrorManager({
            type: 'NOT_FOUND',
            message: " Stack wrong or doesn't exists",
          });
        }

        await this.progressStacksRepository.save({
          user: stackUser.id,
          stack: stackAsigned.id,
          progress: 0,
        });

        return { message: 'Stack added to user' };
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async getOneUserStack(userId: string, stackId: string) {
    return `agrega stack al usuario: ${userId}, ${stackId}`;
  }
  public async getAllUserStack(userId: string) {
    return `agrega stack al usuario: ${userId}`;
  }

  public async findUserBy(options: TSearchConditions<UsersEntity>) {
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
}
