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

  /**
   * @service : Searches and retrieves all Stacks entities with pagination and ordering options.
   * @param query Object containing query options such as limit, page, order, and orderBy.
   * @returns StacksEntity[] - An array of StacksEntity[] or an object containing the array of StacksEntity[] along with pagination information.
   * If limit and page are provided in the query object, an object is returned containing data (array of StacksEntity[]) and pagination (pagination information).
   * If limit and page are not provided, an array of StacksEntity[] is returned directly.
   * @throws ErrorManager.createSignatureError in case of an error.
   */
  async findAll(query): Promise<
    | StacksEntity[]
    | {
        data: StacksEntity[];
        pagination?: { totalPages: number; limit: number; page: number };
      }
  > {
    try {
      const { limit, page, order, orderBy } = query;
      const queryBuilder = this.stackRepository
        .createQueryBuilder('stack')
        .leftJoinAndSelect('stack.themes', 'theme') // Cambiado de 'themes' a 'theme'
        .select([
          'stack',
          'theme.id',
          'theme.name',
          'theme.level',
          'theme.order',
          'theme.points',
        ]);
      //.loadRelationCountAndMap('stack.themeQuantity', 'stack.themes'); // carga el recuento de temas en 'stack'
      let totalPages;

      // Sort if ordering parameters are provided
      if (order && orderBy) {
        queryBuilder.orderBy(`theme.${orderBy}`, order);
      }

      // Paginate if pagination parameters are provided
      if (page && limit) {
        const totalCount = await queryBuilder.getCount();
        totalPages = Math.ceil(totalCount / +limit);
        queryBuilder.skip((page - 1) * +limit).take(limit);
        const data = await queryBuilder.getMany();
        return {
          data,
          pagination: {
            totalPages,
            limit: parseInt(limit),
            page: parseInt(page),
          },
        };
      }

      // Return all stacks if no pagination or ordering parameters are provided
      const data = await queryBuilder.getMany();

      return data;
    } catch (error) {
      console.error(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  // To intern purposes
  async findOne(id: string): Promise<StacksEntity> {
    try {
      // Query to retrieve the Stack entity by ID, including associated Themes through a left join
      const stack: StacksEntity = await this.stackRepository
        .createQueryBuilder('stack')
        .where({ id })
        .getOne();

      // Check if the Stack entity is not found and throw an error if so
      if (!stack) {
        return undefined;
      }
      return stack;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * @function: Finds and retrieves a Stack entity by its ID, including its associated Themes through a left join.
   * @param id<string> The ID of the Stack entity to be retrieved.
   * @returns StackEntity - A StacksEntity representing the found stack, including associated Themes through a left join.
   * @throws ErrorManager.createSignatureError if there is an error during the process.
   */
  public async findStackById(id: string): Promise<StacksEntity> {
    try {
      // Query to retrieve the Stack entity by ID, including associated Themes through a left join
      const stack: StacksEntity = await this.stackRepository
        .createQueryBuilder('stack')
        .where({ id })
        .leftJoinAndSelect('stack.themes', 'themes')
        .select([
          'stack',
          'theme.id',
          'theme.name',
          'theme.level',
          'theme.order',
          'theme.points',
        ])
        .getOne();

      // Check if the Stack entity is not found and throw an error if so
      if (!stack) {
        console.log('id recibida ', id);
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

  /**
   * @service : Finds and retrieves a Stack entity based on specified search conditions.
   * @param options<TSearchConditions<StackEntity> - An object containing search conditions for finding a Stack entity.
   * @returns StackEntity - A StacksEntity representing the found stack based on the provided search conditions.
   * If no matching stack is found, returns undefined.
   * @throws ErrorManager.createSignatureError if there is an error during the process.
   */
  public async findStackBy(options: TSearchConditions<StacksEntity>) {
    try {
      const queryBuilder = this.stackRepository.createQueryBuilder('stack');

      if (options.caseInsensitive) {
        queryBuilder.where(
          `LOWER(${options.field}) = LOWER(:${options.field})`,
          { [options.field]: options.value },
        );
      } else {
        queryBuilder.where({ [options.field]: options.value });
      }

      const stack = await queryBuilder.getOne();

      if (!stack) {
        return undefined;
      }
      return stack;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * @service Updates a Stack entity with the provided data based on its ID.
   * @param id The ID of the Stack entity to be updated.
   * @param updateStackDto An object containing the data to update the Stack entity.
   * @returns An UpdateResult representing the outcome of the update operation.
   * If no matching stack is found to update, returns undefined.
   * @throws ErrorManager.createSignatureError if there is an error during the process.
   */
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

  /**
   * @service Removes a Stack entity based on its ID.
   * @param id The ID of the Stack entity to be removed.
   * @returns A DeleteResult representing the outcome of the removal operation.
   * If no matching stack is found to remove, returns undefined.
   * @throws ErrorManager.createSignatureError if there is an error during the process.
   */
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
