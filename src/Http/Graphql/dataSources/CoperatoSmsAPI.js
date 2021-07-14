const FormData = require('form-data');
const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class CoperatoSmsAPI extends RESTDataSource {
  /**
   * Get my numbers
   *
   * @param url
   * @param apiKey
   *
   * @return {Promise}
   */
  getNumbers(url, apiKey) {
    return this.post(`${url}/sms/get_my_numbers/`, null, {
      headers: {
        api_key: apiKey,
      },
    });
  }

  /**
   * Send sms
   *
   * @param url
   * @param apiKey
   * @param from
   * @param to
   * @param message
   *
   * @return {Promise}
   */
  sendSms(url, apiKey, from, to, message) {
    const formData = new FormData();

    formData.append('from_number', from);
    formData.append('to_number', to);
    formData.append('message', message);
    formData.append('is_unicode', 1);

    return this.post(
      `${url}/sms/send_sms/`,
      formData,
      {
        headers: {
          api_key: apiKey,
          ...formData.getHeaders(),
        },
      },
    );
  }
}

module.exports = CoperatoSmsAPI;
