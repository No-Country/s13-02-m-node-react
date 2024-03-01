import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
export class CreateStackDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;
}
