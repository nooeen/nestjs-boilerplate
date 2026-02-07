import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AssignmentModel } from '@lib/assignments/assignment.schema';
import { BaseRepositoryInterface } from '@app/share/database/base.repository.interface';
import { BaseRepositoryAbstract } from '@app/share/database/base.repository.abstract';

@Injectable()
export class AssignmentsRepository
  extends BaseRepositoryAbstract<AssignmentModel>
  implements BaseRepositoryInterface<AssignmentModel>
{
  constructor(
    @InjectModel(AssignmentModel.name)
    private readonly assignmentModel: Model<AssignmentModel>,
  ) {
    super(assignmentModel);
  }
}
