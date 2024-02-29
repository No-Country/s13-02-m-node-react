/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { Repository } from 'typeorm';
import { GetQuestionDto } from './dto/getQuestion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/entities/user.entity';
import { ErrorManager } from 'src/utils/error.manager';
import { CorrectQuestionDto } from './dto/correctQuestion.dto';
import { ProgressThemesService } from 'src/progress-themes/progress-themes.service';

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @Inject(ProgressThemesService)
    private readonly progressThemesService: ProgressThemesService,
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   *
   * @param query {{ theme: string, level: string, quest_number: number }} query Objeto con los parámetros.
   * @returns  {Promise<any[]>} Un array de objetos que representan preguntas encontradas.
   */
  async getQuestion(query: GetQuestionDto): Promise<any> {
    const message = `{
      theme:${query.theme},
      level:${query.level},
      questNumber:${query.quest_number}
    }`;
    console.log(message)
    const res = [
      { title: "¿Qué es una variable en JavaScript?" },
      { title: "¿Cómo se declara una variable en JavaScript?" },
      { title: "¿Cuál es la diferencia entre var, let y const en JavaScript?" },
      { title: "¿Cómo se asigna un valor a una variable en JavaScript?" },
      { title: "¿Qué es el hoisting en JavaScript y cómo afecta a las variables?" },
      { title: "¿Cuál es el alcance de una variable declarada con var, let y const?" },
      { title: "¿Qué es una variable global en JavaScript?" },
      { title: "¿Cómo se puede concatenar variables y texto en JavaScript?" },
      { title: "¿Qué es una variable NaN en JavaScript y cómo se puede comprobar?" },
      { title: "¿Cómo se puede convertir una variable a un número entero en JavaScript?" }
    ]
    return (res)

   
  }

  /**
   *
   * @param query {{question:string, response:string, id_theme:string}}
   * @returns  {Promise<any{}>} Un JSON { feefback: string, isCorrect: boolean }
   */
  async correctQuestion(query: CorrectQuestionDto): Promise<any> {
    const message = `{ "question":"${query.question}" , "response":${query.response} }`;
    // console.log(message);
    if (query)
      try {
        const assistant = await this.openai.beta.assistants.retrieve(
          'asst_jzuG8bl60SOqsbGwmo44ZnR5',
        );

        const newThread = "thread_fVYOlga3oBmkeG44ceIGr59K";

        await this.openai.beta.threads.messages.create(newThread, {
          role: 'user',
          content: message,
        });

        const run = await this.openai.beta.threads.runs.create(newThread, {
          assistant_id: assistant.id,
        });

        let runStatus = await this.openai.beta.threads.runs.retrieve(
          newThread,
          run.id,
        );
        

        while (runStatus.status !== 'completed') {
          if(runStatus.status === "failed" ){
            return runStatus
          }
          console.log(runStatus.status)
          await new Promise((resolve) => setTimeout(resolve, 2000));
          runStatus = await this.openai.beta.threads.runs.retrieve(
            newThread,
            run.id,
          );
        }

        const messages = await this.openai.beta.threads.messages.list(
          newThread,
        );

        const lastMessageForRun = messages.data
          .filter(
            (message) =>
              message.run_id === run.id && message.role === 'assistant',
          )
          .pop();

        if (lastMessageForRun) {
          const messageJSON = lastMessageForRun.content[0];
          const jsonObject = messageJSON;
          if (jsonObject.type === 'text') {
            const res = JSON.parse(jsonObject.text.value);

            // if (res.isCorrect) {
            //   await this.progressThemesService.update(query.id_theme, 1);
            // }
            return res;
          }
        }
      } catch (error) {
        console.log(error);
        throw ErrorManager.createSignatureError(error.message);
      }
  }
}
