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
      console.log('body recibido ', createThemeDto);
      const stackFound = await this.stackService.findStackById(stack);
      console.log('STACK FOUND : ', stackFound.id);
      if (!stackFound) {
        console.log('STACK FOUND : ', stackFound.id);
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

  findAll() {
    return `This action returns all themes`;
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
