import OpenAI from 'openai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { SpeechCreateParams } from 'openai/resources/audio';
import { ChatCompletionMessageParam } from 'openai/src/resources/chat/completions';
import { BaseServiceInterface } from '@app/share/services/base.service.interface';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;
  static voices = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];

  constructor(
    private readonly configService: ConfigService,
    // private readonly submissionService: SubmissionService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
      baseURL: this.configService.get('OPENAI_BASE_URL'),
    });
  }

  complete(
    messages: Array<ChatCompletionMessageParam>,
    model = 'gpt-4o-mini',
    {
      save = false,
      dataService,
      id = null,
    }: {
      save?: boolean;
      dataService?: BaseServiceInterface<any>;
      id?: string;
    } = {},
  ): Observable<{ data: string }> {
    let result = '';

    return new Observable((subscriber) => {
      this.openai.chat.completions
        .create({
          model,
          messages,
          temperature: 0.8,
          stream: true,
        })
        .then(async (res) => {
          for await (const part of res) {
            if (part.choices[0]?.delta?.content) {
              const formattedData = part.choices[0].delta.content
                ? part.choices[0].delta.content
                : '';
              subscriber.next({ data: `${formattedData}` });
              result += formattedData;
            }
          }
          subscriber.complete();
          if (save && dataService && id) {
            await dataService.create({
              uid: id,
              data: result,
              url: '',
            });
          }
        });
    });
  }

  async textToSpeech(input: string): Promise<Buffer> {
    const speech = await this.openai.audio.speech.create(<SpeechCreateParams>{
      input,
      model: 'tts-1',
      voice:
        OpenAIService.voices[
          Math.floor(Math.random() * OpenAIService.voices.length)
        ].toString(),
    });

    return Buffer.from(await speech.arrayBuffer());
  }
}
