import { Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from '@app/share/services/base.service.abstract';
import { AudioModel } from '@lib/audios/audio.schema';
import { AudiosRepository } from '@lib/audios/audios.repository';

@Injectable()
export class AudiosDataService extends BaseServiceAbstract<AudioModel> {
  constructor(private audiosRepository: AudiosRepository) {
    super(audiosRepository);
  }
}
