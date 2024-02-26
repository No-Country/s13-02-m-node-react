import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateProgressThemeDto {
  @IsInt()
  @IsNotEmpty()
  progress: number;
}
