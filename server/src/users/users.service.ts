import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, EntityManager, Repository, UpdateResult } from 'typeorm';
import { UsersEntity } from './entities/user.entity';
import { RegisterAuthDto } from '../auth/dto/register-auth.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TSearchConditions } from '../types/types/searchConditions';
import { TQueryPagination } from '../types/types/queryPaginations';
import { hash } from 'bcrypt';
import { ErrorManager } from '../utils/error.manager';
import { UserQueryDto } from './dto/user-query.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  /**
   * @service Creates a new user based on the provided registration data.
   * @param user An object containing user registration data.
   * @returns The ID of the newly created user.
   * @throws ErrorManager.createSignatureError if there is an unexpected error during the process.
   * @throws ErrorManager with type 'BAD_REQUEST' and a message if the provided email or username is already in use.
   */
  public async create(user: RegisterAuthDto): Promise<object> {
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

      await this.userRepository.save(user);

      return { message: 'User Created' };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAll(
    query?: UserQueryDto,
  ): Promise<TQueryPagination<UsersEntity>> {
    try {
      const { page, limit, orderBy, order } = { ...query };
      const queryBuilder = this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.stacks', 'stacks') // Relación en UsersEntity
        .leftJoinAndSelect('stacks.stack', 'stack') // Relacion en progressStacks
        .leftJoinAndSelect('stacks.themes', 'themes') // Relacion en progressStacks
        .leftJoinAndSelect('themes.theme', 'theme') // Relacion en ThemesEntity
        .select([
          'user',
          'stacks.id',
          'stacks.progress',
          'stack.name',
          'themes.id',
          'theme.name',
          'theme.description',
          'theme.level',
          'theme.order',
          'themes.progress',
        ]);
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
        .leftJoinAndSelect('user.stacks', 'stacks') // Relación en UsersEntity
        .leftJoinAndSelect('stacks.stack', 'stack') // Relacion en progressStacks
        .leftJoinAndSelect('stacks.themes', 'themes') // Relacion en progressStacks
        .leftJoinAndSelect('themes.theme', 'theme') // Relacion en ThemesEntity
        .select([
          'user',
          'stacks.id',
          'stacks.progress',
          'stack.name',
          'themes.id',
          'theme.name',
          'theme.description',
          'theme.level',
          'theme.order',
          'themes.progress',
        ])
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
    userAuth: { role: string; id: string },
  ): Promise<UpdateResult | undefined> {
    try {
      if (updateUserDto.role && userAuth.role !== 'ADMIN') {
        throw new ErrorManager({
          type: 'FORBIDDEN',
          message: 'You have no privileges for perform this action',
        });
      }
      const userFound: UsersEntity = await this.userRepository.findOne({
        where: { id },
      });
      if (userAuth.id !== userFound.id && userAuth.role !== 'ADMIN') {
        throw new ErrorManager({
          type: 'FORBIDDEN',
          message: 'You have no privileges for perform this action',
        });
      }
      if (updateUserDto.avatarUrl) {
        userFound.avatarUrl = updateUserDto.avatarUrl;
      }

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

  public async updateAvatar(
    id: string,
    avatarUrl: string,
    userAuth: { role: string; id: string },
  ): Promise<UpdateResult | undefined> {
    try {
      // Verifica si el usuario autenticado tiene permiso para actualizar el usuario
      const userFound: UsersEntity = await this.userRepository.findOne({
        where: { id }, // Aquí estamos pasando un objeto con la propiedad 'where'
      });
      if (!userFound) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'User not found',
        });
      }
      if (userAuth.id !== userFound.id && userAuth.role !== 'ADMIN') {
        throw new ErrorManager({
          type: 'FORBIDDEN',
          message: 'You have no privileges for perform this action',
        });
      }

      // Actualiza el avatarUrl del usuario
      const updateResult: UpdateResult = await this.userRepository.update(id, {
        avatarUrl,
      });
      if (updateResult.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Cant update - No user found',
        });
      }
      return updateResult;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async save(user: UsersEntity) {
    try {
      return await this.userRepository.save(user);
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

  public async findOne(id: string, manager?: EntityManager) {
    try {
      if (manager) {
        return await manager.findOne(UsersEntity, {
          where: { id },
        });
      } else {
        return await this.userRepository.findOne({
          where: { id },
        });
      }
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
