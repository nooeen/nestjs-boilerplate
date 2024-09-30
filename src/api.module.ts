import { Module } from '@nestjs/common';
import { ShareModule } from '@app/share';
import { GenerateController } from './controllers/generate.controller';
import { GradingController } from './controllers/grading.controller';
import { GenerateService } from './services/generate.service';
import { GradingService } from './services/grading.service';
import { OpenAIService } from './services/openai.service';
import { AudiosModule } from '@lib/audios';
import { PromptsModule } from '@lib/prompts';
import { PromptsService } from './services/prompts.service';

@Module({
  imports: [ShareModule, AudiosModule, PromptsModule],
  controllers: [GenerateController, GradingController],
  providers: [OpenAIService, GenerateService, GradingService, PromptsService],
})
export class ApiModule {}
