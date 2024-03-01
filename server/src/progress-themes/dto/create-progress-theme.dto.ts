import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProgressThemesDto {
  @IsUUID()
  @IsNotEmpty()
  theme: string;

  @IsUUID()
  @IsNotEmpty()
  progressStack: string;
}
