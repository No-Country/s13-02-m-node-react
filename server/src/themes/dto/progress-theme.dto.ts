import { IsEnum, IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { StacksEntity } from '../../stacks/entities/stack.entity';
import { LEVELS } from '../../config/constants/levels';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEnum(LEVELS, {
    message: 'Solo hay actualmente niveles 1, 2 y 3',
  })
  @IsNotEmpty()
  level: LEVELS;

  @IsInt()
  points: number;
  @IsUUID()
  stack: StacksEntity;
}
