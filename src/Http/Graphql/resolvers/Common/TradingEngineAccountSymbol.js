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
};
