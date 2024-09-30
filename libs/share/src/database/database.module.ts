import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { MongoDBConfigType } from "../configuration/mongodb.config";
import { logExecutionTime } from "mongoose-execution-time";
import { applySpeedGooseCacheLayer } from "speedgoose";
import mongoose from "mongoose";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        mongoose.plugin(logExecutionTime);
        if (
          configService.get<MongoDBConfigType>("mongodb").enableCache &&
          configService.get("NODE_ENV") === "production"
        ) {
          console.log("MongoDB Cache Enabled");
          await applySpeedGooseCacheLayer(mongoose, {
            redisUri: `redis://${
              (configService.get<MongoDBConfigType>("mongodb").cache
                .auth as boolean)
                ? `:${encodeURIComponent(
                  configService.get<MongoDBConfigType>("mongodb").cache
                    .password as string
                )}`
                : ""
            }@${
              configService.get<MongoDBConfigType>("mongodb").cache
                .host as string
            }:${
              configService.get<MongoDBConfigType>("mongodb").cache
                .port as number
            }/${configService.get<MongoDBConfigType>("mongodb").cache.db}`,
            debugConfig: {
              enabled: true,
            },
          });
        }
        return {
          uri: configService.get<MongoDBConfigType>("mongodb").uri,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
