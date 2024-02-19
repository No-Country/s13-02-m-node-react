/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { GetQuestionDto } from './dto/getQuestion.dto';

@Controller('openai')
export class OpenaiController {
    constructor(private readonly openaiService: OpenaiService) {}

    @Post('/question')
    
    async getQuestion(@Body() message: GetQuestionDto): Promise <string>{
        
        return await this.openaiService.getQuestion(message)
    }
}
