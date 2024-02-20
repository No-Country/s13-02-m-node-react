/* eslint-disable prettier/prettier */
import { Controller, Post } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
    constructor(private readonly openaiService: OpenaiService) {}

    @Post('/question')
    async getQuestion(): Promise <string>{
        return await this.openaiService.getQuestion()
    }
}