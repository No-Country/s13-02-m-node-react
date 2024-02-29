import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetQuestionDto {
  @ApiProperty()
  @IsString()
  theme: string;

  @ApiProperty()
  @IsString()
  level: string;

  @ApiProperty()
  @IsNumber()
  quest_number: number;

  @ApiProperty()
  @IsString()
  id_user: string;
}
