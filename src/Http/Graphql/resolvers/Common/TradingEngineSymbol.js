module.exports = {
  /**
   * Get symbol config depends on account (group -> group-security -> symbol)
   *
   * @param symbol
   * @param accountUuid
   * @param dataSources
   *
   * @return {Promise<*>}
   */
  config({ symbol }, { accountUuid }, { dataSources }) {
    return dataSources.TradingEngineAPI.getSymbolConfig(accountUuid, symbol);
  },

  /**
   * Get history of symbol prices
   *
   * @param symbol
   * @param args
   * @param dataSources
   *
   * @return {Promise<*>}
   */
  prices({ symbol }, args, { dataSources }) {
    return dataSources.TradingEngineAPI.getSymbolPrices(symbol, args);
  },
};
