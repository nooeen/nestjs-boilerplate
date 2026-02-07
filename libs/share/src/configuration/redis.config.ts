export type RedisConfigType = {
  host: string;
  port: number;
  auth: boolean;
  db: number;
  password: string | null;
  ttl: string | number;
  prefix: string;
};

export const buildRedisConfig = (
  keymap = 'redis',
  config_prefix = 'REDIS_CACHE',
  config_keys = null,
) => {
  let keys = {
    host: 'HOST',
    port: 'PORT',
    db: 'DB',
    password: 'PASSWORD',
    auth: 'AUTH',
    prefix: 'PREFIX',
  };

  if (config_prefix != '') {
    for (const key in keys) {
      keys[key] = `${config_prefix}_${keys[key]}`;
    }
  }

  if (config_keys != null) {
    keys = config_keys;
  }

  const schema = {};
  schema[keymap] = {
    host: process.env[keys.host],
    port: parseInt(process.env[`${keys.port}`]),
    db: parseInt(process.env[`${keys.db}`]),
    auth: process.env[`${keys.auth}`] == 'true',
    password: process.env[keys.password],
    prefix: process.env[`${keys.prefix}`],
  };

  return schema as { redis: RedisConfigType };
};
