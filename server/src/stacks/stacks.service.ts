import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateStackDto } from './dto/create-stack.dto';
import { UpdateStackDto } from './dto/update-stack.dto';
import { StacksEntity } from './entities/stack.entity';
import { ErrorManager } from '../utils/error.manager';
import { TSearchConditions } from '../types/types/searchConditions';

@Injectable()
export class StacksService {
  constructor(
    @InjectRepository(StacksEntity)
    private stackRepository: Repository<StacksEntity>,
  ) {}

  async create(createStackDto: CreateStackDto) {
    // createStackDto.name = createStackDto.name.toLocaleLowerCase(); -> ver entities

    try {
      const stack = this.stackRepository.create(createStackDto);
      await this.stackRepository.save(stack);
      return stack;
    } catch (error) {
      console.error(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAll() {
    try {
      return await this.stackRepository.find();
    } catch (error) {
      console.error(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findStackById(id: string): Promise<StacksEntity> {
    try {
      const stack: StacksEntity = await this.stackRepository
        .createQueryBuilder('stack')
        .where({ id })
        .leftJoinAndSelect('stack.themes', 'themes')
        .getOne();
      if (!stack) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No stack found',
        });
      }
      return stack;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findStackBy(options: TSearchConditions<StacksEntity>) {
    try {
      const stack: StacksEntity = await this.stackRepository
        .createQueryBuilder('stack')
        .where({ [options.field]: options.value })
        .getOne();

      if (!stack) {
        return undefined;
      }
      return stack;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async update(
    id: string,
    updateStackDto: UpdateStackDto,
  ): Promise<UpdateResult | undefined> {
    try {
      const stack: UpdateResult = await this.stackRepository.update(
        id,
        updateStackDto,
      );
      if (stack.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Cant update - No stack found',
        });
      }
      return stack;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async remove(id: string): Promise<DeleteResult | undefined> {
    try {
      const stack: DeleteResult = await this.stackRepository.delete(id);
      if (stack.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Cant delete - No stack found',
        });
      }
      return stack;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
