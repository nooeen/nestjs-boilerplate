import { IsString } from 'class-validator';

export class GetSubmissionDto {
  @IsString()
  uid: string;
}
