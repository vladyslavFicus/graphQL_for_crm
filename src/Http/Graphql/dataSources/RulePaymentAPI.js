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

  /**
   * Create retention rule
   *
   * @param args
   *
   * @return {*}
   */
  createRule(args) {
    return this.post('/', args);
  }

  /**
   * Delete retention rule
   *
   * @param uuid
   *
   * @return {*}
   */
  deleteRule(uuid) {
    return this.delete(`/${uuid}`);
  }
}

module.exports = RulePaymentAPI;
