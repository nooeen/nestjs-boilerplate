import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { CACHE_5M } from '../constants';
import { ConfigService } from '@nestjs/config';
import { RedisConfigType } from '../configuration/redis.config';

@Injectable()
export class CacheService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly configService: ConfigService,
  ) {
    redis.on('error', function (err) {
      console.log('- REDIS_ERR');
      console.log(err);
    });

    redis.on('connect', function () {
      if (redis.ping()) {
        console.log('- REDIS_CONNECT. OK');
      }
    });
  }

  readonly prefix = `${this.configService.get<RedisConfigType>('redis').prefix}_`;

  async getCache(cache_key: string) {
    const cache_page = await this.get(cache_key);
    if (process.env.NODE_ENV === 'production' && cache_page) {
      console.log('Cache hit: ' + cache_key);
      return cache_page;
    }
    return null;
  }

  async setCache(html: string, cache_key: string, ttl = CACHE_5M) {
    if (process.env.NODE_ENV === 'production') {
      await this.set(cache_key, html, ttl);
    }
  }

  async delCache(cache_key: string) {
    if (process.env.NODE_ENV === 'production') {
      await this.del(cache_key);
    }
  }

  async hmset(id: string, value: any, expire = -1, callback: any) {
    id = `${this.prefix}${id}`;
    await this.redis.hset(id, value);
    if (expire > 0) {
      await this.redis.expire(id, expire);
    }
    callback();
    return 1;
  }

  async hmget(id: string, keys: string) {
    id = `${this.prefix}${id}`;
    return this.redis.hmget(id, keys);

    /*return new Promise((resolve, reject) => {
      redis.HMGET(id, keys, function (err, reply) {
        if (err) {
          console.log(err);
          return reject(err);
        }
        return resolve(reply);
      });
		  //auto increse
      /!*if (expire > 0) {
        redis.expire(id, expire)
      }*!/
	  });*/
  }

  async hset(id: string, key: string, value: string, expire = -1) {
    id = `${this.prefix}${id}`;
    await this.redis.hset(id, key, JSON.stringify(value));
    if (expire > 0) {
      await this.redis.expire(id, expire);
    }
    return 1;

    /*return new Promise((resolve, reject) => {
		  redis.HSET(id, key, JSON.stringify(value), function (err, reply) {
			  if (err) {
				  console.log(err);
				  return reject(err);
			  }
			  return resolve(reply);
		  });
		  redis.expire(id, expire)
	  });*/
  }

  async hget(id: string, key: string) {
    id = `${this.prefix}${id}`;
    return this.redis.hget(id, key);

    /*return new Promise((resolve, reject) => {
		  redis.HGET(id, key, function (err, reply) {
        if (err) {
          console.log(err);
          return reject(err);
        }
        if (reply) {
            console.log("get cache success: " + key);
        }
			  return resolve(JSON.parse(reply));
		  });
	  });*/
  }

  async hgetall(id: string) {
    id = `${this.prefix}${id}`;
    return this.redis.hgetall(id);

    /*return new Promise((resolve, reject) => {
		  redis.hgetall(id, function (err, reply) {
        if (err) {
          console.log(err);
          return reject(err);
        }
        if (reply) {
            console.log("get cache success: " + key);
        }
			  return resolve(reply);
		  });
	  });*/
  }

  async hdel(id: string, key: string) {
    id = `${this.prefix}${id}`;
    return this.redis.hdel(id, key);
  }

  async set(id: string, value: string, expire = -1) {
    id = `${this.prefix}${id}`;
    await this.redis.set(id, value);
    if (expire > 0) {
      await this.redis.expire(id, expire);
    }
    return 1;

    //key = `${this.prefix}${key}`;
    /*return new Promise((resolve, reject) => {
      if (expire > 0) {
        redis.SETEX(id, expire, value, function (err, reply) {
          if (err) {
            console.log(err);
            return reject(err);
          }
          // console.log("set cache success: " + key);
          return resolve(reply);
        });
      } else {
        redis.SET(id, value, function (err, reply) {
          if (err) {
            console.log(err);
            return reject(err);
          }
          // console.log("set cache success: " + key);
          return resolve(reply);
        });
      }
    });*/
  }

  async get(id: string) {
    id = `${this.prefix}${id}`;
    return this.redis.get(id);

    //key = `${this.prefix}${key}`;
    /*return new Promise((resolve, reject) => {
      redis.get(id, function (err, reply) {
        if (err) {
          console.log(err);
          return reject(err);
        }
        if (reply) {
            console.log("get cache success: " + key);
        }
        return resolve(reply);
      });
    });*/
  }

  async exists(key: string) {
    return this.redis.exists(key, function (err, reply) {
      if (err) {
        console.log(err);
        return false;
      }
      return reply === 1;
    });
  }

  async del(ids: string[] | string) {
    //key = `${this.prefix}${key}`;

    if (Array.isArray(ids)) {
      ids.map((id, i) => {
        ids[i] = `${this.prefix}${id}`;
      });
    } else {
      return this.redis.del(ids);
    }

    /*return new Promise((resolve, reject) => {
      redis.del(keys, function (err, reply) {
        if (err) {
          console.log(err);
          return reject(err);
        }
        // console.log("delete cache success: " + key);
        return resolve(reply);
      });
    });*/
  }

  async keys(id: string) {
    id = `${this.prefix}${id}`;
    return this.redis.keys(id);

    //id = `${this.prefix}${id}`;
    /*return new Promise((resolve, reject) => {
      redis.KEYS(string, function (err, reply) {
        if (err) {
          console.log(err);
          return reject(err);
        }
        // if (reply) {
        //     console.log("get cache success: " + key);
        // }
        return resolve(reply);
      });
    });*/
  }

  async incr(id: string, val = 1) {
    await this.redis.incrby(`${this.prefix}${id}`, val);
  }

  async hincr(id: string, key: string, val = 1) {
    await this.redis.hincrby(`${this.prefix}${id}`, key, val);
    return 1;

    /*return new Promise((resolve, reject) => {
      redis.hincrby(id, key, val, function (err, reply) {
        if (err) {
          console.log(err);
          return reject(err);
        }
        return resolve(reply);
      });
    });*/
  }

  async lpushArrObj(id: string, data = []) {
    try {
      //push nhiều cái
      const data_ok = [];
      data.map((item) => {
        data_ok.push(JSON.stringify(item));
      });
      await this.redis.lpush(`${this.prefix}${id}`, ...data_ok);
      return 1;

      /* //push từng cái
      let async_data = [];
      data.map(item => {
        async_data.push(redis.lpush(id, JSON.stringify(item)))
      })
      await Promise.all(async_data).then().catch(function (err) {console.error('ERROR lpushArrObj')});*/
    } catch (err: any) {
      console.error(`ERROR lpushArrObj ${err}`);
    }
  }

  async rpop(id: string) {
    id = `${this.prefix}${id}`;
    return this.redis.rpop(id);

    /*return new Promise((resolve, reject) => {
      redis.rpop(id , function (err, data) {
        if (err) {
          console.error(err);
          return reject(null);
        }
        return resolve(JSON.parse(data));
      });
    });*/
  }

  async lpushArr(id, data = []) {
    try {
      await this.redis.lpush(`${this.prefix}${id}`, ...data);
    } catch (err) {
      console.error(err);
    }
  }
}
