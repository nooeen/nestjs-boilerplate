import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SubmissionModel,
  SubmissionSchema,
} from '@lib/submissions/submission.schema';
import { SubmissionsRepository } from '@lib/submissions/submissions.repository';
import { SubmissionsDataService } from '@lib/submissions/submissions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SubmissionModel.name,
        schema: SubmissionSchema,
        collection: 'submissions',
      },
    ]),
  ],
  providers: [SubmissionsRepository, SubmissionsDataService],
  exports: [SubmissionsDataService],
})
export class SubmissionsModule {}
