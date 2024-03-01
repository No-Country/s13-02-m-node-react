import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { LEVELS } from 'src/config/constants/levels';

export class UpdateThemeDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEnum(LEVELS, {
    message: 'Solo hay actualmente niveles 1, 2 y 3',
  })
  @IsNotEmpty()
  level: LEVELS;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  points: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @IsPositive({ message: 'El número de orden debe ser positivo' })
  order: number;
}
