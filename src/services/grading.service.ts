import OpenAI from 'openai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { PromptsService } from './prompts.service';
import { OpenAIService } from './openai.service';
import { STRING_TO_REPLACE } from '../constants';
import { escapeMarkdown } from '@app/share/utils/escape-markdown';

@Injectable()
export class GradingService {
  private openai: OpenAI;

  constructor(
    private readonly configService: ConfigService,
    private readonly openAIService: OpenAIService,
    private readonly promptsService: PromptsService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
      baseURL: this.configService.get('OPENAI_BASE_URL'),
    });
  }

  async grade(
    promptKey: string,
    questions: string,
    answer: string,
  ): Promise<Observable<{ data: string }>> {
    return this.openAIService.complete(
      await this.promptsService.buildPrompt(promptKey, [
        {
          search: STRING_TO_REPLACE.QUESTIONS,
          replace: questions,
        },
        {
          search: STRING_TO_REPLACE.ANSWER,
          replace: escapeMarkdown(answer),
        },
      ]),
    );
  }

  async gradeListening(
    promptKey: string,
    convo: string,
    questions: string,
    answer: string,
  ): Promise<Observable<{ data: string }>> {
    return this.openAIService.complete(
      await this.promptsService.buildPrompt(promptKey, [
        {
          search: STRING_TO_REPLACE.CONVO,
          replace: escapeMarkdown(convo),
        },
        {
          search: STRING_TO_REPLACE.QUESTIONS,
          replace: escapeMarkdown(questions),
        },
        {
          search: STRING_TO_REPLACE.ANSWER,
          replace: escapeMarkdown(answer),
        },
      ]),
    );
  }
}
