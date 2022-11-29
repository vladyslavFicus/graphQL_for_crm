const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class CallbackAPI extends RESTDataSource {
  /**
   * Get lead callbacks
   *
   * @param args
   *
   * @return {Promise}
   */
  getLeadCallbacks(args) {
    return this.post('/lead/search', args);
  }

  /**
   * Create lead callback
   *
   * @param args
   *
   * @return {Promise}
   */
  createLeadCallback(args) {
    return this.post('/lead', args);
  }

  /**
   * Update lead callback
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
   * Delete lead callback
   *
   * @param callbackId
   *
   * @return {Promise}
   */
  deleteLeadCallback(callbackId) {
    return this.delete(`/lead/${callbackId}`);
  }

  /**
   * Get client callbacks
   *
   * @param args
   *
   * @return {Promise}
   */
  getClientCallbacks(args) {
    return this.post('/client/search', args);
  }

  /**
   * Create client callback
   *
   * @param args
   *
   * @return {Promise}
   */
  createClientCallback(args) {
    return this.post('/client', args);
  }

  /**
   * Update client callback
   *
   * @param callbackId
   * @param args
   *
   * @return {Promise}
   */
  updateClientCallback(callbackId, args) {
    return this.put(`/client/${callbackId}`, args);
  }

  /**
   * Delete client callback
   *
   * @param callbackId
   *
   * @return {Promise}
   */
  deleteClientCallback(callbackId) {
    return this.delete(`/client/${callbackId}`);
  }
}

module.exports = CallbackAPI;
