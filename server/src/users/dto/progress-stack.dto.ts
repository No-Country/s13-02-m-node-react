import { IsArray, IsInt, IsNotEmpty, IsUUID } from 'class-validator';
import { UsersEntity } from '../entities/user.entity';
import { StacksEntity } from '../../stacks/entities/stack.entity';
import { ProgressThemesEntity } from '../../themes/entities/progressTheme.entity';

export class ProgressStackDto {
  @IsNotEmpty()
  @IsUUID()
  user: UsersEntity;

  @IsNotEmpty()
  @IsUUID()
  stack: StacksEntity;

  @IsInt()
  progress: number;

  @IsArray()
  themes: ProgressThemesEntity[];
}
