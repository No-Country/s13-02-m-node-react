import { IsString, MinLength } from 'class-validator';
export class CreateStackDto {
  @IsString()
  @MinLength(1)
  name: string;
}
