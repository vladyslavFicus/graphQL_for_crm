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
    return this.post('/client/search', args);
  }

  /**
   * Create callback
   *
   * @param args
   *
   * @return {Promise}
   */
  createCallback(args) {
    return this.post('/client/', args);
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
    return this.put(`/client/${callbackId}`, args);
  }
}

module.exports = CallbackAPI;
