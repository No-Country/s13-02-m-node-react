import { IsString, MinLength } from 'class-validator';
export class UpdateStackDto {
  @IsString()
  @MinLength(1)
  name: string;
}
