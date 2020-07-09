const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class CallbackAPI extends RESTDataSource {
  /**
   * Get callbacks
   *
   * @param args
   *
   * @return {Promise}
   */
  getCallbacks(args) {
    return this.post('/search', args);
  }

  /**
   * Create callback
   *
   * @param args
   *
   * @return {Promise}
   */
  createCallback(args) {
    return this.post('/', args);
  }

  /**
   * Update callback
   *
   * @param callbackId
   * @param args
   *
   * @return {Promise}
   */
  updateCallback(callbackId, args) {
    return this.put(`/${callbackId}`, args);
  }
}

module.exports = CallbackAPI;
