import { Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from '@app/share/services/base.service.abstract';
import { PromptModel } from '@lib/prompts/prompt.schema';
import { PromptsRepository } from '@lib/prompts/prompts.repository';

@Injectable()
export class PromptsDataService extends BaseServiceAbstract<PromptModel> {
  constructor(private promptsRepository: PromptsRepository) {
    super(promptsRepository);
  }
}
