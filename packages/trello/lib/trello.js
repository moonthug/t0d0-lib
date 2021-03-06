const HttpClient = require('@moonthug/http-client');

class Trello {
  /**
   *
   * @param {String} apiKey
   * @param {String} token
   * @param {String} [baseURL='https://api.trello.com'] baseURL
   * @param {Object} [httpOptions=null] httpOptions
   */
  constructor(apiKey, token, { baseURL = 'https://api.trello.com', httpOptions = null } = {}) {
    this.httpClient = new HttpClient(httpOptions);
    this.apiKey = apiKey;
    this.token = token;
    this.baseURL = baseURL;
  }

  /**
   * @inheritDoc https://developers.trello.com/reference#boardsboardid-1
   *
   * @async
   * @param {String} id
   * @param {Object} [params={}] params
   * @returns {Promise<void>}
   */
  async getBoard(id, params = {}) {
    return this.get(`/1/boards/${id}`, { params });
  }

  /**
   * @inheritDoc https://developers.trello.com/reference#boardsboardid-1
   *
   * @async
   * @param {String} id
   * @param {String} field
   * @param {Object} [params={}] params
   * @returns {Promise<void>}
   */
  async getBoardField(id, field, params = {}) {
    return this.get(`/1/boards/${id}/${field}`, { params });
  }

  /**
   * @inheritDoc https://developers.trello.com/reference#cardsid
   *
   * @async
   * @param {String} id
   * @param {Object} [params={}] params
   * @returns {Promise<void>}
   */
  async getCard(id, params = {}) {
    return this.get(`/1/cards/${id}`, { params });
  }

  /**
   * @inheritDoc https://developers.trello.com/reference#cardsid
   *
   * @async
   * @param {String} id
   * @param {String} field
   * @param {Object} [params={}] params
   * @returns {Promise<void>}
   */
  async getCardField(id, field, params = {}) {
    return this.get(`/1/cards/${id}/${field}`, { params });
  }

  /**
   * @inheritDoc https://developers.trello.com/reference/#cards-2
   *
   * @async
   * @param {Object} [data={}] data
   * @param {Object} [params={}] params
   * @returns {Promise<void>}
   */
  async postCard(data = {}, params = {}) {
    return this.post(`/1/cards`, { data, params });
  }

  /**
   * @inheritDoc https://developers.trello.com/reference#membersid
   *
   * @async
   * @param {String} id
   * @param {Object} [params={}] params
   * @returns {Promise<void>}
   */
  async getMember(id, params = {}) {
    return this.get(`/1/members/${id}`, { params });
  }

  /**
   * @inheritDoc https://developers.trello.com/reference#membersid
   *
   * @async
   * @param {String} id
   * @param {String} field
   * @param {Object} [params={}] params
   * @returns {Promise<void>}
   */
  async getMemberField(id, field, params = {}) {
    return this.get(`/1/members/${id}/${field}`, { params });
  }

  /**
   * @inheritDoc https://developers.trello.com/v1.0/reference#custom-fields
   *
   * @async
   * @param {String} id
   * @param {Object} [params={}] params
   * @returns {Promise<void>}
   */
  async getCustomField(id, params = {}) {
    return this.get(`/1/customFields/${id}`, { params });
  }

  /**
   * @inheritDoc https://developers.trello.com/v1.0/reference#custom-fields
   *
   * @async
   * @param {String} id
   * @param {Object} [params={}] params
   * @returns {Promise<void>}
   */
  async getCustomFieldOptions(id, params = {}) {
    return this.get(`/1/customFields/${id}/options`, { params });
  }

  /**
   *
   * @param {String} path
   * @param {Object} options
   * @returns {Promise<void>}
   */
  async get(path, options) {
    return this.request('get', path, options);
  }

  /**
   *
   * @param {String} path
   * @param {Object} options
   * @returns {Promise<void>}
   */
  async post(path, options) {
    return this.request('post', path, options);
  }

  /**
   *
   * @param {String} method
   * @param {String} path
   * @param {Object} options
   * @returns {Promise<void>}
   */
  async request(method, path, options) {
    const url = `${this.baseURL}${path}`;

    options.params = {
      key: this.apiKey,
      token: this.token,
      ...options.params
    };

    return this.httpClient.request(method, url, options);
  }
}

module.exports = Trello;
