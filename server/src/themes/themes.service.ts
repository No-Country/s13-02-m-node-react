import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { ThemesEntity } from './entities/theme.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { StacksService } from 'src/stacks/stacks.service';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(ThemesEntity)
    private themeRepository: Repository<ThemesEntity>,
    @Inject(StacksService)
    private stackService: StacksService,
  ) {}

  public async create(createThemeDto: CreateThemeDto) {
    try {
      const stack = createThemeDto.stack;
      const stackFound = await this.stackService.findStackById(stack);

      if (!stackFound) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `There is no stack with the id: ${stack}`,
        });
      }

      const theme = this.themeRepository.create({
        name: createThemeDto.name.toLowerCase(),
        level: createThemeDto.level,
        points: createThemeDto.points,
        order: createThemeDto.order,
        description: createThemeDto.description || null,
        stack: stackFound,
      });

      await this.themeRepository.save(theme);
      return theme;
    } catch (error) {
      console.error(error);
      if (error.code === '23505')
        throw new ConflictException(
          `Theme with name '${createThemeDto.name}' already exists.`,
        );
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAll(
    page?: number,
    limit?: number,
    order?: 'ASC' | 'DESC',
    orderBy?: keyof ThemesEntity,
  ): Promise<
    | ThemesEntity[]
    | {
        data: ThemesEntity[];
        pagination: { totalPages: number; limit: number; page: number };
      }
  > {
    try {
      const queryBuilder = this.themeRepository.createQueryBuilder('theme');
      let totalPages;
      console.log(`theme[${orderBy}]`, order);
      if (order && orderBy) {
        queryBuilder.orderBy(`theme[${orderBy}]`, order);
      }
      if (page && limit) {
        const totalCount = await queryBuilder.getCount();
        totalPages = Math.ceil(totalCount / limit);
        queryBuilder.skip((page - 1) * limit).take(limit);
        const data = await queryBuilder.getMany();
        return { data, pagination: { totalPages, limit, page } };
      }

      return await queryBuilder.getMany();
    } catch (error) {
      console.error(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  findOne(id: number) {
    return `This action returns a #${id} theme`;
  }

  update(id: number, updateThemeDto: UpdateThemeDto) {
    return `This action updates a #${id} theme`;
  }

  remove(id: number) {
    return `This action removes a #${id} theme`;
  }
}
