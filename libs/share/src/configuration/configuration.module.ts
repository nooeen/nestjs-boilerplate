import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { buildMongoDBConfig } from './mongodb.config';
import * as Joi from 'joi';
import { mongodbConfigSchema } from './schemas/mongodb.schema';
import { redisConfigSchema } from '@app/share/configuration/schemas/redis.schema';
import {buildRedisConfig} from "@app/share/configuration/redis.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      load: [buildMongoDBConfig,
        // buildRedisConfig
      ],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision', 'staging')
          .default('development'),
        PORT: Joi.number().default(3001),
        OPENAI_API_KEY: Joi.string().required(),
        OPENAI_BASE_URL: Joi.string().required(),
        ...mongodbConfigSchema(),
        // ...redisConfigSchema(true),
      }),
    }),
  ],
})
export class ConfigurationModule {}
