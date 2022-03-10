const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class LiquidityProviderAPI extends RESTDataSource {

  /**
   * force liquidity provider adapter streaming restart
   
   * @return {*}
   */
  streamingRestart() {
    return this.post('/admin/streaming/restart');
  }

}

module.exports = LiquidityProviderAPI;
