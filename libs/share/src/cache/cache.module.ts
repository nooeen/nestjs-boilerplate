import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ConfigService } from '@nestjs/config';
import { CacheService } from './cache.service';
import { RedisConfigType } from '../configuration/redis.config';

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'single',
        url: `redis://${
          (configService.get<RedisConfigType>('redis').auth as boolean)
            ? `:${
                configService.get<RedisConfigType>('redis').password as string
              }`
            : ''
        }@${configService.get<RedisConfigType>('redis').host as string}:${
          configService.get<RedisConfigType>('redis').port as number
        }`,
        options: {
          db: configService.get<RedisConfigType>('redis').db as number,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
