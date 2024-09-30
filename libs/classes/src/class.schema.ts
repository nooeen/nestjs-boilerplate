import { BaseSchema } from '@app/share/database/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { STATUS } from 'src/constants';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    getters: true,
  },
})
export class ClassModel extends BaseSchema {
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
    type: Number,
    default: STATUS.SHOW,
  })
  status: number;
}

export type ClassDocument = ClassModel & mongoose.Document;
const schema = SchemaFactory.createForClass(ClassModel);

schema.pre('save', function (this: ClassModel, next) {
  this.updated_at = Date.now();
  next();
});
schema.loadClass(ClassModel);

export const ClassSchema = schema;
