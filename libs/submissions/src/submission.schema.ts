import { BaseSchema } from '@app/share/database/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { STATUS } from '../../../src/constants';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    getters: true,
  },
})
export class SubmissionModel extends BaseSchema {
  @Prop({
    required: true,
    index: true,
  })
  public uid: string;

  @Prop({
    required: true,
    index: true,
  })
  public slug: string;

  @Prop({
    required: true,
  })
  public name: string;

  @Prop()
  public essay: string;

  @Prop()
  public result: string;

  @Prop({
    required: true,
    index: true,
  })
  public assignment_uid: string;

  @Prop({
    type: Number,
    default: STATUS.SHOW,
  })
  status: number;
}

export type SubmissionDocument = SubmissionModel & mongoose.Document;
const schema = SchemaFactory.createForClass(SubmissionModel);

schema.pre('save', function (this: SubmissionModel, next) {
  this.updated_at = Date.now();
  next();
});
schema.loadClass(SubmissionModel);

export const SubmissionSchema = schema;
