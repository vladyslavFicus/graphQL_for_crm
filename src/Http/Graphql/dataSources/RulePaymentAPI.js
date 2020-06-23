const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class RulePaymentAPI extends RESTDataSource {
  /**
   * Search rules
   *
   * @param args
   *
   * @return {*}
   */
  search(args) {
    return this.get('/', args);
  }
}

module.exports = RulePaymentAPI;
