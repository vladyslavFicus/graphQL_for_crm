const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class CallbackAPI extends RESTDataSource {
  /**
   * Get callbacks lead
   *
   * @param args
   *
   * @return {Promise}
   */
  getLeadCallbacks(args) {
    return this.post('/lead/search', args);
  }

  /**
   * Create callback lead
   *
   * @param args
   *
   * @return {Promise}
   */
  createLeadCallback(args) {
    return this.post('/lead', args);
  }

  /**
   * Update callback lead
   *
   * @param callbackId
   * @param args
   *
   * @return {Promise}
   */
  updateLeadCallback(callbackId, args) {
    return this.put(`/lead/${callbackId}`, args);
  }

  /**
   * Get callbacks client
   *
   * @param args
   *
   * @return {Promise}
   */
  getClientCallbacks(args) {
    return this.post('/client/search', args);
  }

  /**
   * Create callback client
   *
   * @param args
   *
   * @return {Promise}
   */
  createClientCallback(args) {
    return this.post('/client', args);
  }

  /**
   * Update callback client
   *
   * @param callbackId
   * @param args
   *
   * @return {Promise}
   */
  updateClientCallback(callbackId, args) {
    return this.put(`/client/${callbackId}`, args);
  }
}

module.exports = CallbackAPI;
