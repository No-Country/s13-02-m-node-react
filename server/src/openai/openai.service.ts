/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { Repository } from 'typeorm';
import { GetQuestionDto } from './dto/getQuestion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/entities/user.entity';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async getQuestion(query: GetQuestionDto): Promise<any> {
    //? Cambiar por uno más complejo
    const message = `{
      theme:${query.theme},
      level:${query.level},
      questNumber:${query.quest_number}
    }`
    ;

    //? Modificar esta parte cuando sepa que retorna la line 35
    let thread: string;
    

    try {
      const assistant = await this.openai.beta.assistants.retrieve(
        'asst_6Kac0xPgkjUuoPWR684nHWsc', 
      );

      if (!query.id_thread) {
        const newThread = await this.openai.beta.threads.create();
        await this.userRepository.update(query.id_user, {
          identifier_ia: newThread.id,
        });
        thread = newThread.id
      }

      await this.openai.beta.threads.messages.create(thread, {
        role: 'user',
        content: message,
      });

       const run = await this.openai.beta.threads.runs.create(thread, {
        assistant_id: assistant.id,
      });

      let runStatus = await this.openai.beta.threads.runs.retrieve(
        thread,
        run.id,
      );

      while (runStatus.status !== 'completed') {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        runStatus = await this.openai.beta.threads.runs.retrieve(
          thread,
          run.id,
        );
      }

    const messages = await this.openai.beta.threads.messages.list(thread);

   
    const lastMessageForRun = messages.data
      .filter(
        (message) => message.run_id === run.id && message.role === "assistant"
      )
      .pop();

      if (lastMessageForRun) {
        const messageJSON = lastMessageForRun.content[0];
        const jsonObject = messageJSON;
        if(jsonObject.type === 'text'){
          return JSON.parse(jsonObject.text.value)
        }
        
      }
      

     
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error.message)
    }
  }
}
