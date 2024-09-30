import { IsString } from 'class-validator';

export class GradingDto {
  @IsString()
  prompt_key: string;

  @IsString()
  questions: string;

  @IsString()
  answer: string;
}
