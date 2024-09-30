import { Injectable } from '@nestjs/common';
import { ShareService } from '@app/share';
import { SubmissionsDataService } from '@lib/submissions';

@Injectable()
export class SubmissionsService {
  constructor(
    private readonly shareService: ShareService,
    private submissionsDataService: SubmissionsDataService,
  ) {}

  async createSubmission(
    assignment_uid: string,
    name: string,
    essay: string,
    result: string,
  ) {
    return this.submissionsDataService.create({
      uid: this.shareService.makeid(),
      slug: this.shareService.slugify(
        `${name}-${assignment_uid}-${Date.now()}`,
      ),
      assignment_uid,
      name,
      essay,
      result,
    });
  }

  async getSubmission(uid: string) {
    return this.submissionsDataService.findOne({ filter: { uid } });
  }

  async getSubmissionsByAssignment(assignment_uid: string) {
    return this.submissionsDataService.find({
      filter: {
        assignment_uid,
      },
    });
  }
}
