const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class DidLogicAPI extends RESTDataSource {
  /**
   * Create call to DidLogic
   *
   * @param url DidLogic host url
   * @param number Client phone number
   * @param agent Operator SIP number
   *
   * @return {Promise}
   */
  createCall(url, number, agent) {
    return this.post(url, { number, agent });
  }
}

module.exports = DidLogicAPI;
