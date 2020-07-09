const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class AccountViewAPI extends RESTDataSource {
  /**
   * Get trading accounts
   *
   * @param args
   *
   * @return {Promise}
   */
  getTradingAccounts(args) {
    return this.get('/accounts/search', args);
  }
}

module.exports = AccountViewAPI;
