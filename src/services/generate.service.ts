import OpenAI from 'openai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { OpenAIService } from './openai.service';
import { AudiosDataService } from '@lib/audios';
import { STRING_TO_REPLACE } from '../constants';
import { PromptsService } from './prompts.service';
import { escapeMarkdown } from '@app/share/utils/escape-markdown';

@Injectable()
export class GenerateService {
  private openai: OpenAI;
  static voices = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];
  static generateModel = 'gpt-4o';

  constructor(
    private readonly configService: ConfigService,
    private readonly openAIService: OpenAIService,
    private readonly promptsService: PromptsService,
    private readonly audiosDataService: AudiosDataService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
      baseURL: this.configService.get('OPENAI_BASE_URL'),
    });
  }

  async generateListeningConvoTranscript(
    promptKey: string,
    id: string,
  ): Promise<Observable<{ data: string }>> {
    return this.openAIService.complete(
      await this.promptsService.buildPrompt(promptKey),
      GenerateService.generateModel,
      {
        save: true,
        dataService: this.audiosDataService,
        id,
      },
    );
  }

  async generateListeningConvoAudio(id: string): Promise<Buffer> {
    return this.openAIService.textToSpeech(
      (
        await this.audiosDataService.findOne({
          filter: {
            uid: id,
          },
        })
      ).data,
    );
  }

  async generateListeningQuestions(
    promptKey: string,
    convo: string,
  ): Promise<Observable<{ data: string }>> {
    return this.openAIService.complete(
      await this.promptsService.buildPrompt(promptKey, [
        {
          search: STRING_TO_REPLACE.CONVO,
          replace: escapeMarkdown(convo),
        },
      ]),
      GenerateService.generateModel,
    );
  }

  async generateQuestions(
    promptKey: string,
  ): Promise<Observable<{ data: string }>> {
    return this.openAIService.complete(
      await this.promptsService.buildPrompt(promptKey),
      GenerateService.generateModel,
    );
  }
}
