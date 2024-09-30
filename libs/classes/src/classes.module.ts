import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassModel, ClassSchema } from '@lib/classes/class.schema';
import { ClassesRepository } from '@lib/classes/classes.repository';
import { ClassesDataService } from '@lib/classes/classes.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ClassModel.name,
        schema: ClassSchema,
        collection: 'classes',
      },
    ]),
  ],
  providers: [ClassesRepository, ClassesDataService],
  exports: [ClassesDataService],
})
export class ClassesModule {}
