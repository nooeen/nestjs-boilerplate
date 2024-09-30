import { Provider } from "@nestjs/common";
import { redisStore } from "cache-manager-redis-yet";
import { ConfigService } from "@nestjs/config";

export type CustomCacheConfig = {
  key: string;
  db: number;
  ttl: number;
};

export function build_cache_provider(config: CustomCacheConfig): Provider {
  return {
    provide: config.key,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      store: await redisStore({
        url: `redis://${configService.get("REDIS_HOST")}:${configService.get(
          "REDIS_PORT"
        )}`,
        ...(configService.get("REDIS_PASSWORD") !== undefined &&
          configService.get("REDIS_PASSWORD") !== null && {
            password: configService.get("REDIS_PASSWORD"),
          }),
        database: config.db,
      }),
    }),
  };
}
