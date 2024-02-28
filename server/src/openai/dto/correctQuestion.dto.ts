import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CorrectQuestionDto {
  @ApiProperty()
  @IsString()
  question: string;

  @ApiProperty()
  @IsString()
  response: string;

  @ApiProperty()
  @IsString()
  id_theme: string;
}
