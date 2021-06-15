const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class CoperatoAPI extends RESTDataSource {
  /**
   * Create call to Coperato
   *
   * @param url
   * @param extension
   * @param phoneNum
   *
   * @return {Promise}
   */
  createCall(url, extension, phoneNum) {
    return this.post(url, {
      extension,
      phone_num: phoneNum,
    });
  }
}

module.exports = CoperatoAPI;
