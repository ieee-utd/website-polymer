export const REDIS_HOST = process.env.CACHE_HOST || "127.0.0.1";

const bluebird = require('bluebird');
export const redis = bluebird.promisifyAll(require('redis').createClient({
  host: REDIS_HOST
}));
export const cache = require('apicache').options({
  debug: false,
  defaultDuration: '1 hour',
  statusCodes: {
    include: [ 200 ]
  },
})
export const cacheMiddleware = cache.middleware;
