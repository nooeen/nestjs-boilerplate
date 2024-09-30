import { RedisConfigType, buildRedisConfig } from "./redis.config";

export type MongoDBConfigType = {
  uri: string;
  enableCache: string | boolean;
  cache?: RedisConfigType | null;
};

export const buildMongoDBConfig: () => { mongodb: MongoDBConfigType } = () => {
  const config: { mongodb: MongoDBConfigType } = {
    mongodb: {
      uri: process.env.MONGODB_URI,
      enableCache: process.env.MONGODB_ENABLE_CACHE,
    },
  };

  if (config.mongodb.enableCache) {
    config.mongodb = {
      ...config.mongodb,
      ...buildRedisConfig("cache", "MONGODB_CACHE"),
    };
  }

  return config;
};
