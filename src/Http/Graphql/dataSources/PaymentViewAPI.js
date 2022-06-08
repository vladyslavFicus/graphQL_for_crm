const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class PaymentViewAPI extends RESTDataSource {
  /**
   * Get payments
   *
   * @param args
   *
   * @return {Promise}
   */
  getPayments(args) {
    return this.post('/search', args);
  }

  /**
   * Get payments statistic
   *
   * @param args
   *
   * @return {Promise}
   */
  getPaymentsStatistic(args) {
    return this.post('/statistics', args);
  }
}

module.exports = PaymentViewAPI;
