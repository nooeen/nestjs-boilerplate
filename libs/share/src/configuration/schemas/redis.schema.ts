import * as Joi from 'joi';
import {HOST_SCHEMA, PORT_SCHEMA} from "@app/share/configuration/schemas/common.schema";

export function redisConfigSchema(
  required = false,
  prefix = 'REDIS_CACHE',
  config_keys = null,
) {
  let keys = {
    host: 'HOST',
    port: 'PORT',
    db: 'DB',
    auth: 'AUTH',
    password: 'PASSWORD',
    ttl: 'TTL',
    prefix: 'PREFIX',
  };

  if (prefix != '') {
    for (const key in keys) {
      keys[key] = `${prefix}_${keys[key]}`;
    }
  }

  if (config_keys != null) {
    keys = config_keys;
  }

  const schema = {};
  schema[`${keys.host}`] = HOST_SCHEMA.default('localhost');
  schema[`${keys.port}`] = PORT_SCHEMA.default(6379);
  schema[`${keys.db}`] = Joi.number().default(1);
  schema[`${keys.auth}`] = Joi.boolean().default(false);
  schema[`${keys.password}`] = Joi.string().allow(null, '').default('example');
  schema[`${keys.ttl}`] = Joi.number().default(0);
  schema[`${keys.prefix}`] = Joi.string().default('');

  if (required) {
    for (const key in schema) {
      schema[key] = schema[key].required();
    }
  }
  return schema;
}
