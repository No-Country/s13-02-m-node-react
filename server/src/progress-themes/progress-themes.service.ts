import { Inject, Injectable } from '@nestjs/common';
import { CreateProgressThemesDto } from './dto';
import { ErrorManager } from 'src/utils/error.manager';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgressThemesEntity } from './entities/progress-theme.entity';
import { Repository } from 'typeorm';
import { ProgressStacksService } from 'src/progress-stacks/progress-stacks.service';
import { UsersService } from 'src/users/users.service';
import { ProgressStacksEntity } from 'src/progress-stacks/entities/progress-stack.entity';
import { UsersEntity } from 'src/users/entities/user.entity';

@Injectable()
export class ProgressThemesService {
  themeRepository: any;
  constructor(
    @InjectRepository(ProgressThemesEntity)
    private readonly progressThemesRepository: Repository<ProgressThemesEntity>,
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
        progress: progressThemeDto.progress,
        progressStack: progressStackAsigned,
        theme: themeRequired,
      });

      await this.progressThemesRepository.save(myNewProgressTheme);
      return { message: 'Stack added to user' };
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
