import { BaseSchema } from '@app/share/database/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { STATUS } from '../../../src/constants';

@Schema({
  _id: false,
  id: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    getters: true,
  },
})
export class AssignmentModel extends BaseSchema {
  @Prop({
    required: true,
    index: true,
  })
  public uid: string;

  @Prop({
    required: true,
  })
  public name: string;

  @Prop({
    required: true,
    index: true,
  })
  public slug: string;

  @Prop({
    required: true,
    index: true,
  })
  public class_uid: string;

  @Prop({
    type: Number,
    default: STATUS.SHOW,
  })
  status: number;
}

export type AssignmentDocument = AssignmentModel & mongoose.Document;
const schema = SchemaFactory.createForClass(AssignmentModel);

schema.pre('save', function (this: AssignmentModel, next) {
  this.updated_at = Date.now();
  next();
});
schema.loadClass(AssignmentModel);

export const AssignmentSchema = schema;
