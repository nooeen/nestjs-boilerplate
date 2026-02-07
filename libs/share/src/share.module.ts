import { Module } from '@nestjs/common';
import { ShareService } from './share.service';
import { ConfigurationModule } from './configuration/configuration.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule],
  providers: [ShareService],
  exports: [ShareService],
})
export class ShareModule {}
