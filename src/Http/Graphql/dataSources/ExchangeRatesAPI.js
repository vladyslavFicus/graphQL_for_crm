const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class ExchangeRatesAPI extends RESTDataSource {
  /**
   * Get currency rates
   *
   * @param currency
   *
   * @return {Promise}
   */
  getRates(currency) {
    return this.get(`/internal/rates/${currency}`);
  }
}

module.exports = ExchangeRatesAPI;
