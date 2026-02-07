import { Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from '@app/share/services/base.service.abstract';
import { ClassModel } from '@lib/classes/class.schema';
import { ClassesRepository } from '@lib/classes/classes.repository';

@Injectable()
export class ClassesDataService extends BaseServiceAbstract<ClassModel> {
  constructor(private classesRepository: ClassesRepository) {
    super(classesRepository);
  }
}
