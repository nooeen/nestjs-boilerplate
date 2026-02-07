import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PromptModel, PromptSchema } from '@lib/prompts/prompt.schema';
import { PromptsRepository } from '@lib/prompts/prompts.repository';
import { PromptsDataService } from '@lib/prompts/prompts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PromptModel.name,
        schema: PromptSchema,
        collection: 'prompts',
      },
    ]),
  ],
  providers: [PromptsRepository, PromptsDataService],
  exports: [PromptsDataService],
})
export class PromptsModule {}
