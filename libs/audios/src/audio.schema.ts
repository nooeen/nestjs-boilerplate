import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BaseSchema } from '@app/share/database/base.schema';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    getters: true,
  },
})
export class AudioModel extends BaseSchema {
  @Prop({ index: true })
  public uid: string;

  @Prop()
  public data: string;
}

export type AudioDocument = AudioModel & mongoose.Document;
const schema = SchemaFactory.createForClass(AudioModel);

schema.loadClass(AudioModel);

export const AudioSchema = schema;
