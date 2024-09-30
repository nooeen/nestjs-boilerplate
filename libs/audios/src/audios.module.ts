import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AudioModel, AudioSchema } from '@lib/audios/audio.schema';
import { AudiosRepository } from '@lib/audios/audios.repository';
import { AudiosDataService } from '@lib/audios/audios.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AudioModel.name,
        schema: AudioSchema,
        collection: 'audios',
      },
    ]),
  ],
  providers: [AudiosRepository, AudiosDataService],
  exports: [AudiosDataService],
})
export class AudiosModule {}
