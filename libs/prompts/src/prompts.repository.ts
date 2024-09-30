import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepositoryInterface } from '@app/share/database/base.repository.interface';
import { BaseRepositoryAbstract } from '@app/share/database/base.repository.abstract';
import { PromptModel } from '@lib/prompts/prompt.schema';

@Injectable()
export class PromptsRepository
  extends BaseRepositoryAbstract<PromptModel>
  implements BaseRepositoryInterface<PromptModel>
{
  constructor(
    @InjectModel(PromptModel.name)
    private readonly promptModel: Model<PromptModel>,
  ) {
    super(promptModel);
  }
}
