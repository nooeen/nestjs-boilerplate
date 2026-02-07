import { Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from '@app/share/services/base.service.abstract';
import { SubmissionModel } from '@lib/submissions/submission.schema';
import { SubmissionsRepository } from '@lib/submissions/submissions.repository';

@Injectable()
export class SubmissionsDataService extends BaseServiceAbstract<SubmissionModel> {
  constructor(private submissionsRepository: SubmissionsRepository) {
    super(submissionsRepository);
  }
}
