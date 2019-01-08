const hash = require('object-hash');
const Redis = require('ioredis');
const msgpack = require('msgpack');

class HTTPCache {
  /**
   *
   * @param {Object} options
   */
  constructor(options) {
    this._redis = new Redis({
      port: options.port || 6379,
      host: options.port || '127.0.0.1',
      db: options.db || 0
    });

    this.ns = options.ns || 'cache';
    this.ttl = options.ttl || 60 * 60;
  }

  /**
   *
   * @param {Object} object
   * @returns {Promise<void>}
   */
  async get(object) {
    const objHash = hash(object);

    let result;

    try {
      result = await this._redis.get(this._getDbKey(objHash));
    } catch (e) {
      return null;
    }

    try {
      result = msgpack.unpack(result);
    } catch (e) {
      return null;
    }

    return result;
  }

  /**
   *
   * @param {Object} objectKey
   * @param {Object} objectValue
   * @param {Object} options
   * @returns {Promise<void>}
   */
  async set(objectKey, objectValue, options) {
    options = options || {};

    const objHash = hash(objectKey);

    let objectStringValue;
    try {
      objectStringValue = msgpack.pack(objectValue);
    } catch (e) {
      return null;
    }

    const ttl = options.ttl || this.ttl;

    let result;

    try {
      result = await this._redis.set(
        this._getDbKey(objHash),
        objectStringValue
      );
      await this._redis.expire(this._getDbKey(objHash), ttl);
    } catch (e) {
      return null;
    }

    return result;
  }

  /**
   *
   * @param {String} hash
   * @returns {String}
   * @private
   */
  _getDbKey(hash) {
    return `${this.ns}:${hash}`;
  }
}

module.exports = HTTPCache;
