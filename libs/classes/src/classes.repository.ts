import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepositoryInterface } from '@app/share/database/base.repository.interface';
import { BaseRepositoryAbstract } from '@app/share/database/base.repository.abstract';
import { ClassModel } from '@lib/classes/class.schema';

@Injectable()
export class ClassesRepository
  extends BaseRepositoryAbstract<ClassModel>
  implements BaseRepositoryInterface<ClassModel>
{
  constructor(
    @InjectModel(ClassModel.name)
    private readonly classModel: Model<ClassModel>,
  ) {
    super(classModel);
  }
}
