import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Sse,
  StreamableFile,
} from '@nestjs/common';
import { GenerateService } from '../services/generate.service';
import { Observable } from 'rxjs';

@Controller('ai/generate')
export class GenerateController {
  constructor(private readonly generateService: GenerateService) {}

  @Post('listening/convo')
  @Sse()
  @HttpCode(200)
  async generateListeningConvoTranscript(
    @Body() { prompt_key, id }: { prompt_key: string; id: string },
  ): Promise<Observable<{ data: string }>> {
    return (await this.generateService.generateListeningConvoTranscript(
      prompt_key,
      id,
    )) as Observable<{
      data: string;
    }>;
  }

  @Get('listening/audio/:id')
  async generateListeningConvoAudio(
    @Param('id') id: string,
  ): Promise<StreamableFile> {
    return new StreamableFile(
      await this.generateService.generateListeningConvoAudio(id),
    );
  }

  @Post('listening/questions')
  @Sse()
  @HttpCode(200)
  async generateListeningQuestions(
    @Body() { prompt_key, convo }: { prompt_key: string; convo: string },
  ): Promise<Observable<{ data: string }>> {
    return (await this.generateService.generateListeningQuestions(
      prompt_key,
      convo,
    )) as Observable<{
      data: string;
    }>;
  }

  @Post('writing')
  @Sse()
  @HttpCode(200)
  async generateWriting(
    @Body() { prompt_key }: { prompt_key: string },
  ): Promise<Observable<{ data: string }>> {
    return (await this.generateService.generateQuestions(
      prompt_key,
    )) as Observable<{
      data: string;
    }>;
  }

  @Post('reading')
  @Sse()
  @HttpCode(200)
  async generateReading(
    @Body() { prompt_key }: { prompt_key: string },
  ): Promise<Observable<{ data: string }>> {
    return (await this.generateService.generateQuestions(
      prompt_key,
    )) as Observable<{
      data: string;
    }>;
  }

  @Post('speaking')
  @Sse()
  @HttpCode(200)
  async generateSpeaking(
    @Body() { prompt_key }: { prompt_key: string },
  ): Promise<Observable<{ data: string }>> {
    return (await this.generateService.generateQuestions(
      prompt_key,
    )) as Observable<{
      data: string;
    }>;
  }
}
