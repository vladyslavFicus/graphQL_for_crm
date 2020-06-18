const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class TradingActivityAPI extends RESTDataSource {
  /**
   * Get trading activity operations list
   *
   * @param args
   *
   * @return {Promise}
   */
  getTradingActivity(args) {
    return this.post('/', args);
  }

  /**
   * Change trading activity original agent
   *
   * @param args
   *
   * @return {Promise}
   */
  changeOriginalAgent(args) {
    return this.put('/record', args);
  }
}

module.exports = TradingActivityAPI;
