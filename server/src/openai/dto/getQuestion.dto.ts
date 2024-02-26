/* eslint-disable prettier/prettier */
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class GetQuestionDto {
  @IsString()
  theme: string;

  @IsString()
  level: string;

  @IsNumber()
  quest_number: number;

  @IsString()
  @IsOptional()
  id_thread?: string;

  @IsString()
  id_user?: string;
}
