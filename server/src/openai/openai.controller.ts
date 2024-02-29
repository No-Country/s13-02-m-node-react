/* eslint-disable prettier/prettier */
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { GetQuestionDto } from './dto/getQuestion.dto';
import { CorrectQuestionDto } from './dto/correctQuestion.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('OpenAi')
@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('/question')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: `[{"title": "string"}]`,
  })
  @ApiBody({ type: GetQuestionDto })
  async getQuestion(@Body() petition: GetQuestionDto): Promise<string[]> {
    return await this.openaiService.getQuestion(petition);
  }

  @Post('/correct')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: `{"isCorrect": Boolean,"feedback": "string"}`,
  })
  @ApiBody({ type: CorrectQuestionDto })
  async correctQuestion(@Body() petition: CorrectQuestionDto): Promise<object> {
    return await this.openaiService.correctQuestion(petition);
  }
}
