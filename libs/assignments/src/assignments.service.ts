import { Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from '@app/share/services/base.service.abstract';
import { AssignmentModel } from '@lib/assignments/assignment.schema';
import { AssignmentsRepository } from '@lib/assignments/assignments.repository';

@Injectable()
export class AssignmentsDataService extends BaseServiceAbstract<AssignmentModel> {
  constructor(private assignmentsRepository: AssignmentsRepository) {
    super(assignmentsRepository);
  }
}
