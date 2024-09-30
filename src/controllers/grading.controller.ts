import { Body, Controller, HttpCode, Post, Sse } from '@nestjs/common';
import { GradingDto } from '../dto/grading.dto';
import { Observable } from 'rxjs';
import { GradingService } from '../services/grading.service';

@Controller('ai/grading')
export class GradingController {
  constructor(private readonly gradingService: GradingService) {}

  @Post('listening')
  @Sse()
  @HttpCode(200)
  async gradeListening(
    @Body()
    {
      prompt_key,
      convo,
      questions,
      answers,
    }: {
      prompt_key: string;
      convo: string;
      questions: string;
      answers: string;
    },
  ): Promise<Observable<{ data: string }>> {
    return (await this.gradingService.gradeListening(
      prompt_key,
      convo,
      questions,
      answers,
    )) as Observable<{
      data: string;
    }>;
  }

  @Post('writing')
  @Sse()
  @HttpCode(200)
  async gradeWriting(
    @Body() { prompt_key, questions, answer }: GradingDto,
  ): Promise<Observable<{ data: string }>> {
    return (await this.gradingService.grade(
      prompt_key,
      questions,
      answer,
    )) as Observable<{
      data: string;
    }>;
  }

  @Post('reading')
  @Sse()
  @HttpCode(200)
  async gradeReading(
    @Body() { prompt_key, questions, answer }: GradingDto,
  ): Promise<Observable<{ data: string }>> {
    return (await this.gradingService.grade(
      prompt_key,
      questions,
      answer,
    )) as Observable<{
      data: string;
    }>;
  }

  @Post('speaking')
  @Sse()
  @HttpCode(200)
  async gradeSpeaking(
    @Body() { prompt_key, questions, answer }: GradingDto,
  ): Promise<Observable<{ data: string }>> {
    return (await this.gradingService.grade(
      prompt_key,
      questions,
      answer,
    )) as Observable<{
      data: string;
    }>;
  }
}
