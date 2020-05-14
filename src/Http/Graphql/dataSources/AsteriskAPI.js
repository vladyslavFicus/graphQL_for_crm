const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');
const FormData = require('form-data');

class AsteriskAPI extends RESTDataSource {
  /**
   * Create call to Asterisk
   *
   * @param url
   * @param token
   * @param sip
   * @param number
   * @param prefix
   *
   * @return {Promise}
   */
  createCall(url, token, sip, number, prefix) {
    const formData = new FormData();

    formData.append('sip', sip || ''); // Because SIP can be null, but formData append throw error if provided null value
    formData.append('number', number);
    formData.append('prefix', prefix);

    return this.post(`${url}/api/call/create?token=${token}`, formData, {
      headers: formData.getHeaders(),
    });
  }
}

module.exports = AsteriskAPI;
