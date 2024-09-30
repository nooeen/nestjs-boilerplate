import { IsString } from 'class-validator';

export class GetSubmissionsByAssignmentDto {
  @IsString()
  assignment_uid: string;
}
