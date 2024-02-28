/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { GetQuestionDto } from './dto/getQuestion.dto';
import { CorrectQuestionDto } from './dto/correctQuestion.dto';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('/question')
  async getQuestion(@Body() petition: GetQuestionDto): Promise<string[]> {
    return await this.openaiService.getQuestion(petition);
  }

  @Post('/correct')
  async correctQuestion(@Body() petition: CorrectQuestionDto): Promise<object> {
    return await this.openaiService.correctQuestion(petition);
  }
}
