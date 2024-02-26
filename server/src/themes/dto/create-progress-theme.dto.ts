import { IsInt, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateProgressThemesDto {
  @IsInt()
  @IsOptional()
  progress: number;

  @IsUUID()
  @IsNotEmpty()
  theme: string;

  @IsUUID()
  @IsNotEmpty()
  progressStack: string;
}
