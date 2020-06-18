const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');
const buildQueryString = require('../../../utils/buildQueryString');

class AccountViewAPI extends RESTDataSource {
  /**
   * Get trading accounts
   *
   * @param args
   *
   * @return {Promise}
   */
  getTradingAccounts(args) {
    return this.get(`/accounts/search?${buildQueryString(args)}`);
  }
}

module.exports = AccountViewAPI;
