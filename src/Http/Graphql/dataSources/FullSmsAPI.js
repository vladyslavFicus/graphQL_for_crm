const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class FullSmsAPI extends RESTDataSource {
  willSendRequest(request) {
    request.headers.set('Authorization', `Bearer ${this.context.brand.sms.fullSms.apiKey}`);
  }

  /**
   * Get my numbers
   *
   * @return {Promise}
   */
  getNumbers() {
    return this.get('https://api.fullsms.com/account/numbers');
  }

  /**
   * Send sms
   *
   * @param from
   * @param to
   * @param message
   *
   * @return {Promise}
   */
  sendSms(from, to, message) {
    return this.post('https://api.fullsms.com/messages/send/to_numbers', {
      from,
      to_numbers: [to],
      message,
    });
  }
}

module.exports = FullSmsAPI;
