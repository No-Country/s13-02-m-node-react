import { IsNotEmpty, IsPositive } from 'class-validator';

export class UpdateProgressStackDto {
  @IsNotEmpty()
  @IsPositive()
  progress: number;
}
