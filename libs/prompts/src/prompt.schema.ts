import mongoose from 'mongoose';
import { BaseSchema } from '@app/share/database/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    getters: true,
  },
})
export class PromptModel extends BaseSchema {
  @Prop({
    required: true,
    index: true,
  })
  public key: string;

  @Prop({
    type: mongoose.Schema.Types.Mixed,
  })
  public value: any;
}

export type PromptDocument = PromptModel & mongoose.Document;
const schema = SchemaFactory.createForClass(PromptModel);

schema.pre('save', function (this: PromptModel, next) {
  this.updated_at = Date.now();
  next();
});
schema.loadClass(PromptModel);

export const PromptSchema = schema;
