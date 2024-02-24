import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { LEVELS } from 'src/config/constants/levels';
import {
  IsNumber,
  IsPositive,
  IsString,
  //ValidateNested,
} from 'class-validator';

export class CreateThemeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(LEVELS, {
    message: 'Solo hay actualmente niveles 1, 2 y 3',
  })
  @IsNotEmpty()
  level: LEVELS;

  @IsNumber()
  @IsNotEmpty()
  points: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive({ message: 'El número de orden debe ser positivo' })
  order: number;

  @IsUUID()
  @IsNotEmpty()
  stack: string;
}
