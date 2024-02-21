/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { Repository } from 'typeorm';
import { GetQuestionDto } from './dto/getQuestion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/entities/user.entity';

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
    const message = `Generame una pregunta de JavaScript sobre el tema "${query.theme}" y
         la dificultad "${query.level}"`;

    //? Modificar esta parte cuando sepa que retorna la line 35
    let thread: any = query.id_thread;

    try {
      const assistant = await this.openai.beta.assistants.retrieve(
        'asst_1esBOvDpe9Cq0VQJOyA4luEJ', //? Este asistente se debe cambiar por uno entrenado para esto
      );

      if (!query.id_thread) {
        thread = await this.openai.beta.threads.create();
        await this.userRepository.update(query.id_user, {
          identifierIA: thread.id,
        });
      }

      await this.openai.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: message,
      });

      const run = await this.openai.beta.threads.runs.create(thread.id, {
        assistant_id: assistant.id,
      });

      let runStatus = await this.openai.beta.threads.runs.retrieve(
        thread.id,
        run.id,
      );

      while (runStatus.status !== 'completed') {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        runStatus = await this.openai.beta.threads.runs.retrieve(
          thread.id,
          run.id,
        );
      }

      return await this.openai.chat.completions.create({
        messages: [{ content: message, role: 'user' }],
        model: 'gpt-3.5-turbo',
      });
    } catch (error) {
      console.log(error);
    }
  }
}
