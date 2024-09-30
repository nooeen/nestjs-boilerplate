import { Injectable } from '@nestjs/common';
import { PromptsDataService } from '@lib/prompts';
import { ChatCompletionMessageParam } from 'openai/src/resources/chat/completions';

@Injectable()
export class PromptsService {
  constructor(private readonly promptsDataService: PromptsDataService) {}

  async buildPrompt(
    promptKey: string,
    replaces: { search: string; replace: string }[] = [],
  ): Promise<Array<ChatCompletionMessageParam>> {
    let promptString = JSON.stringify(
      (await this.promptsDataService.findOne({ filter: { key: promptKey } }))
        .value,
    );

    if (replaces && replaces.length)
      for (let i = 0; i < replaces.length; i++) {
        promptString = promptString.replaceAll(
          replaces[i].search,
          replaces[i].replace,
        );
      }

    console.log(promptString);

    return JSON.parse(promptString) as Array<ChatCompletionMessageParam>;
  }
}
