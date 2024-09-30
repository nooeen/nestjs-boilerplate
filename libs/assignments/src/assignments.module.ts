import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  AssignmentModel,
  AssignmentSchema,
} from '@lib/assignments/assignment.schema';
import { AssignmentsRepository } from '@lib/assignments/assignments.repository';
import { AssignmentsDataService } from '@lib/assignments/assignments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AssignmentModel.name,
        schema: AssignmentSchema,
        collection: 'assignments',
      },
    ]),
  ],
  providers: [AssignmentsRepository, AssignmentsDataService],
  exports: [AssignmentsDataService],
})
export class AssignmentsModule {}
