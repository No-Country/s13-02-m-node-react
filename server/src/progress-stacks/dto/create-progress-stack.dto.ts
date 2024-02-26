import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProgressStackDto {
  @IsNotEmpty()
  @IsUUID()
  user: string;

  @IsNotEmpty()
  @IsUUID()
  stack: string;
}
