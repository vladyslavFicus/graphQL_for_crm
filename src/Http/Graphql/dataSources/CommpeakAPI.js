const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class CommpeakAPI extends RESTDataSource {
  /**
   * Create call to Commpeak
   *
   * @param url
   * @param sip
   * @param number
   * @param prefix
   *
   * @return {Promise}
   */
  createCall(url, sip, number, prefix) {
    return this.get(`${url}/${sip}/${number}/${prefix}`);
  }
}

module.exports = CommpeakAPI;
