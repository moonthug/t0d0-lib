const lodash = require('lodash');
const axios = require('axios');
const debug = require('debug')('http-client');

const HttpCache = require('@moonthug/http-cache');

class HttpClient {
  /**
   *
   * @param options
   */
  constructor(options) {
    this.options = lodash.defaultsDeep(options, {
      cache: {
        enabled: true,
        ns: 'httpcache',
        ttl: 60 * 15,
      }
    });

    if (this.options.cache && this.options.cache.enabled === true) {
      this.cache = new HttpCache(this.options.cache);
    }
  }

  /**
   *
   * @param {String} method
   * @param {String} url
   * @param {Object} options
   * @returns {Promise<*>}
   */
  async request(method, url, options) {
    const request = { method, url, ...options };

    let response = await this._getCachedRequest(request);

    if (response) {
      return response;
    }

    try {
      response = await axios(request);
    } catch (e) {
      throw e;
    }

    await this._setCachedRequest(request, response.data);

    return response.data;
  }

  /**
   *
   * @param {Object} request
   * @returns {Promise<*>}
   * @private
   */
  async _getCachedRequest(request) {
    if (this.options.cache.enabled === true) {
      try {
        const cache = await this.cache.get(request);
        if (cache) {
          debug('Cached: ', request.url);
          return cache;
        }
      } catch (e) {
        // cache fail
        debug('Cache fail!', request.url);
        debug(e);
      }
    }
    return null;
  }

  /**
   *
   * @param {Object} request
   * @param {Object} data
   * @returns {Promise<*>}
   * @private
   */
  async _setCachedRequest(request, data) {
    if (this.options.cache.enabled === true) {
      try {
        await this.cache.set(request, data);
      } catch (e) {
        // cache fail
        console.error('Cache fail!');
        console.dir(e);
      }
    }
  }
}

module.exports = HttpClient;
