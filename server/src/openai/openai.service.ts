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
    let thread: string;

    try {
      const assistant = await this.openai.beta.assistants.retrieve(
        'asst_6Kac0xPgkjUuoPWR684nHWsc',
      );
      const userFound = await this.userRepository.findOne({
        where: {
          id: query.id_user,
        },
      });
      if (!userFound)
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'User not found',
        });

      thread = userFound.identifier_ia;

      if (!userFound.identifier_ia) {
        const newThread = await this.openai.beta.threads.create();
        await this.userRepository.update(query.id_user, {
          identifier_ia: newThread.id,
        });
        thread = newThread.id;
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
          (message) =>
            message.run_id === run.id && message.role === 'assistant',
        )
        .pop();

      if (lastMessageForRun) {
        const messageJSON = lastMessageForRun.content[0];
        const jsonObject = messageJSON;
        if (jsonObject.type === 'text') {
          return JSON.parse(jsonObject.text.value);
        }
      }
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error.message);
    }
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

        const newThread = await this.openai.beta.threads.create();

        await this.openai.beta.threads.messages.create(newThread.id, {
          role: 'user',
          content: message,
        });

        const run = await this.openai.beta.threads.runs.create(newThread.id, {
          assistant_id: assistant.id,
        });

        let runStatus = await this.openai.beta.threads.runs.retrieve(
          newThread.id,
          run.id,
        );

        while (runStatus.status !== 'completed') {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          runStatus = await this.openai.beta.threads.runs.retrieve(
            newThread.id,
            run.id,
          );
        }

        const messages = await this.openai.beta.threads.messages.list(
          newThread.id,
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
