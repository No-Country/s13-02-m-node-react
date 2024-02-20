/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import  OpenAI from 'openai';


@Injectable()
export class OpenaiService {
    private openai: OpenAI

    
    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        })
    }
    
    async getQuestion(): Promise<any> {
        return await this.openai.chat.completions.create({
          messages: [{ role: 'user', content: 'Generame una pregunta de programación' }],
          model: 'gpt-3.5-turbo',
        })
    }
    
}