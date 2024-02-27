import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StacksService } from 'src/stacks/stacks.service';
import { ThemesEntity } from './entities/theme.entity';
import { ErrorManager } from 'src/utils/error.manager';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { ThemeQueryDto } from './dto/theme-query.dto';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(ThemesEntity)
    private themeRepository: Repository<ThemesEntity>,
    @Inject(StacksService)
    private stackService: StacksService,
  ) {}

  /**
   * @service Creates a new Theme entity based on the provided data.
   * @param createThemeDto An object containing the data to create a new Theme entity.
   * @returns ThemeEntity - The created Theme entity.
   * @throws ErrorManager.createSignatureError if there is an unexpected error during the process.
   * @throws ConflictException if a theme with the same name already exists (unique constraint violation).
   * @throws ErrorManager with type 'BAD_REQUEST' if the associated Stack specified in createThemeDto is not found.
   */
  public async create(createThemeDto: CreateThemeDto) {
    try {
      const stack = createThemeDto.progressStack;
      const stackFound = await this.stackService.findOne(stack);
      if (!stackFound) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `There is no stack with the id: ${stack}`,
        });
      }
      if (!createThemeDto.order) {
        const maxOrder = await this.getMaxOrderForStack(stack);
        createThemeDto.order = maxOrder + 1;
      }
      const theme = this.themeRepository.create({
        name: createThemeDto.name.toLowerCase(),
        level: createThemeDto.level,
        points: createThemeDto.points,
        order: createThemeDto.order,
        description: createThemeDto.description || null,
        stack: stackFound,
      });
      const newTheme = await this.themeRepository.save(theme);
      return { id: newTheme.id };
    } catch (error) {
      console.error(error);
      if (error.code === '23505')
        throw new ConflictException(
          `Theme with name '${createThemeDto.name}' already exists.`,
        );
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  private async getMaxOrderForStack(stackId: string): Promise<number> {
    const maxOrder = await this.themeRepository
      .createQueryBuilder('theme')
      .select('MAX(theme.order)', 'maxOrder')
      .where('theme.stackId = :stackId', { stackId })
      .getRawOne();

    return maxOrder?.maxOrder || 0;
  }
  /**
   * @service Retrieves all Theme entities with optional pagination and ordering.
   * @param query An object containing options for pagination (page, limit) and ordering (orderBy, order).
   * @returns ThemesEntity[] - An object containing the array of ThemesEntity[] and optional pagination information.
   * If pagination options (page, limit) are provided, returns pagination information along with the array of ThemesEntity[].
   * If no pagination options are provided, returns an object with only the array of ThemesEntity[].
   * @throws ErrorManager.createSignatureError if there is an unexpected error during the process.
   */
  public async findAll(query: ThemeQueryDto): Promise<{
    data: ThemesEntity[];
    pagination?: { totalPages: number; limit: number; page: number };
  }> {
    try {
      const { page, limit, orderBy, order } = query;
      const queryBuilder = this.themeRepository.createQueryBuilder('theme');
      //.leftJoinAndSelect('theme.stack', 'stack');
      // .select([
      //   'theme.id',
      //   'theme.name',
      //   'theme.level',
      //   'theme.description',
      //   'theme.points',
      //   'theme.order',
      //   'stack.id',
      //   'stack.name',
      // ]);

      if (order && orderBy) {
        queryBuilder.orderBy(`theme.${orderBy}`, order);
      }

      if (page && limit) {
        const askedPage = +page;
        const definedLimit = +limit;
        const totalCount = await queryBuilder.getCount();
        const totalPages = Math.ceil(totalCount / definedLimit);
        queryBuilder.skip((askedPage - 1) * definedLimit).take(definedLimit);
        const data = await queryBuilder.getMany();
        return {
          data,
          pagination: { totalPages, limit: definedLimit, page: askedPage },
        };
      }

      const data = await queryBuilder.getMany();
      return { data };
    } catch (error) {
      console.error(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * @service Retrieves a Theme entity by its ID, including associated Stack information through a left join.
   * @param id The ID of the Theme entity to be retrieved.
   * @returns A ThemesEntity representing the found theme, including associated Stack information through a left join.
   * @throws ErrorManager.createSignatureError if there is an unexpected error during the process.
   * @throws ErrorManager with type 'NOT_FOUND' if no matching Theme is found.
   */
  public async findById(id: string): Promise<ThemesEntity> {
    try {
      const theme: ThemesEntity = await this.themeRepository
        .createQueryBuilder('theme')
        .where({ id })
        .leftJoinAndSelect('theme.stack', 'stack')
        // .select([
        //   'theme.id',
        //   'theme.name',
        //   'theme.level',
        //   'theme.description',
        //   'theme.points',
        //   'theme.order',
        //   'stack.id',
        //   'stack.name',
        // ])
        .getOne();

      if (!theme) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No Theme found',
        });
      }
      return theme;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * @service Updates an existing Theme entity based on its ID with the provided data.
   * @param id The ID of the Theme entity to be updated.
   * @param updateThemeDto An object containing the data to update the Theme entity.
   * @returns An UpdateResult representing the outcome of the update operation.
   * If no matching theme is found to update, returns undefined.
   * @throws ErrorManager.createSignatureError if there is an unexpected error during the process.
   * @throws ErrorManager with type 'NOT_FOUND' if no matching Theme is found to update.
   */
  public async update(
    id: string,
    updateThemeDto: UpdateThemeDto,
  ): Promise<{ message: string } | undefined> {
    try {
      const theme: UpdateResult = await this.themeRepository.update(id, {
        ...updateThemeDto,
      });

      if (theme.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Cant update - No theme found',
        });
      }
      return { message: 'Theme Updated' };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * @service Removes a Theme entity based on its ID.
   * @param id The ID of the Theme entity to be removed.
   * @returns A DeleteResult representing the outcome of the removal operation.
   * If no matching theme is found to remove, returns undefined.
   * @throws ErrorManager.createSignatureError if there is an unexpected error during the process.
   * @throws ErrorManager with type 'NOT_FOUND' if no matching Theme is found to remove.
   */
  public async remove(id: string): Promise<{ message: string } | undefined> {
    try {
      const theme: DeleteResult = await this.themeRepository.delete(id);
      if (theme.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Cant delete - No theme found',
        });
      }
      return { message: 'Theme Deleted' };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  // remove theme
}
