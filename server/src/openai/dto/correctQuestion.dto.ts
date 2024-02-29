import { IsString } from 'class-validator';

export class CorrectQuestionDto {
  @IsString()
  question: string;

  @IsString()
  response: string;
}
