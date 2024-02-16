import { IsEnum, IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { StacksEntity } from '../../stacks/entities/stack.entity';
import { LEVELS } from '../../config/constants/levels';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEnum({ type: 'enum', enum: LEVELS, default: LEVELS.DEBUTANT })
  level: LEVELS;
  @IsInt()
  points: number;
  @IsUUID()
  stack: StacksEntity;
}
