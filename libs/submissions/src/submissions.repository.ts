import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepositoryInterface } from '@app/share/database/base.repository.interface';
import { BaseRepositoryAbstract } from '@app/share/database/base.repository.abstract';
import { SubmissionModel } from '@lib/submissions/submission.schema';

@Injectable()
export class SubmissionsRepository
  extends BaseRepositoryAbstract<SubmissionModel>
  implements BaseRepositoryInterface<SubmissionModel>
{
  constructor(
    @InjectModel(SubmissionModel.name)
    private readonly submissionModel: Model<SubmissionModel>,
  ) {
    super(submissionModel);
  }
}
