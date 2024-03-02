import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProgressThemesDto } from './dto/create-progress-theme.dto';
import { ProgressThemesEntity } from './entities/progress-theme.entity';
import { ProgressStacksEntity } from '../progress-stacks/entities/progress-stack.entity';
import { ProgressStacksService } from '../progress-stacks/progress-stacks.service';
import { UsersService } from '../users/users.service';
import { UsersEntity } from '../users/entities/user.entity';
import { ErrorManager } from '../utils/error.manager';
import { ThemesEntity } from 'src/themes/entities/theme.entity';
@Injectable()
export class ProgressThemesService {
  constructor(
    @InjectRepository(ProgressThemesEntity)
    private readonly progressThemesRepository: Repository<ProgressThemesEntity>,
    @InjectRepository(ThemesEntity)
    private readonly themeRepository: Repository<ThemesEntity>,
    @Inject(ProgressStacksService)
    private progressStacksService: ProgressStacksService,
    @Inject(UsersService)
    private usersService: UsersService,
  ) {}

  public async create(
    progressThemeDto: CreateProgressThemesDto,
    userAuth: { role: string; id: string },
  ) {
    try {
      const { theme: themeId, progressStack: progressStackId } =
        progressThemeDto;

      // See if progressStack id exists
      const progressStackAsigned =
        await this.progressStacksService.findOne(progressStackId);

      if (!progressStackAsigned) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: ' You must add the stack before adding a theme',
        });
      }

      console.log(
        'user Auth ',
        userAuth.id,
        ' user stack asigned ',
        progressStackAsigned.userId,
      );
      // See if user has permission to make the action.
      if (
        userAuth.id !== progressStackAsigned.userId &&
        userAuth.role !== 'ADMIN'
      ) {
        throw new ErrorManager({
          type: 'FORBIDDEN',
          message: 'You have no privileges for perform this action',
        });
      }

      // check if the theme is already linked to progressStack
      const isAlreadyLinked = await this.progressThemesRepository.findOne({
        where: { themeId, progressStackId }});

      if (isAlreadyLinked) {
        throw new ErrorManager({
          type: 'UNPROCESSABLE_ENTITY',
          message: 'Theme already linked to this stack',
        });
      }
      // See if theme required exists and it is a child of the stack
      const themeRequired = await this.themeRepository.findOne({
        where: {
          id: themeId,
          stackId: progressStackAsigned.stackId,
        },
      });

      if (!themeRequired) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message:
            " Theme wrong or doesn't exists or is not a theme from the stack",
        });
      }
      const myNewProgressTheme = this.progressThemesRepository.create({
        progressStack: progressStackAsigned,
        theme: themeRequired,
      });

      await this.progressThemesRepository.save(myNewProgressTheme);
      return { message: 'Theme added to user' };
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAllByStackProgress(progressStackId: string) {
    try {
      return await this.progressThemesRepository.find({
        where: { progressStackId },
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOne(id: string) {
    try {
      return await this.progressThemesRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async update(id: string, points: number) {
    return this.progressThemesRepository.manager.transaction(
      async (manager) => {
        try {
          // Recupera la entidad por su ID
          const progressThemeFound =
            await this.progressThemesRepository.findOne({
              where: { id },
            });

          const progressStackFound = await this.progressStacksService.findOne(
            progressThemeFound.progressStackId,
            manager,
          );

          const userFound = await this.usersService.findOne(
            progressStackFound.userId,
            manager,
          );

          if (!progressThemeFound || !progressStackFound || !userFound) {
            throw new ErrorManager({
              type: 'NOT_FOUND',
              message: 'Bad identifier',
            });
          }

          // Actualiza los valores
          progressThemeFound.progress += points;
          progressStackFound.progress += points;
          userFound.totalPoints += points;

          // Guarda los cambios en la transacción
          await manager.save(ProgressThemesEntity, progressThemeFound);
          await manager.save(ProgressStacksEntity, progressStackFound);
          await manager.save(UsersEntity, userFound);

          return { message: 'Points updated' }; // Retorna un mensaje de éxito
          // Si todas las operaciones son exitosas, no haces nada, ya que la transacción se comprometerá automáticamente
        } catch (error) {
          // Si se produce un error, se revertirán todas las operaciones de la transacción
          throw ErrorManager.createSignatureError(error.message);
        }
      },
    );
  }

  async remove(id: string) {
    try {
      return await this.progressThemesRepository.delete(id);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
