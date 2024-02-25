import { IsInt, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateProgressStackDto {
  @IsNotEmpty()
  @IsUUID()
  user: string;

  @IsNotEmpty()
  @IsUUID()
  stack: string;

  @IsInt()
  @IsOptional()
  progress?: number;
}
