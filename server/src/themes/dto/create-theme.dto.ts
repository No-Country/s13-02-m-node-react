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

  @IsEnum({ type: 'enum', enum: LEVELS, default: LEVELS.DEBUTANT })
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
