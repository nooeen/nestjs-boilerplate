import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepositoryInterface } from '@app/share/database/base.repository.interface';
import { BaseRepositoryAbstract } from '@app/share/database/base.repository.abstract';
import { AudioModel } from '@lib/audios/audio.schema';

@Injectable()
export class AudiosRepository
  extends BaseRepositoryAbstract<AudioModel>
  implements BaseRepositoryInterface<AudioModel>
{
  constructor(
    @InjectModel(AudioModel.name)
    private readonly audioModel: Model<AudioModel>,
  ) {
    super(audioModel);
  }
}
