module.exports = {
  /**
   * Get symbol config depends on account (group -> group-security -> symbol)
   *
   * @param name
   * @param accountUuid
   * @param dataSources
   *
   * @return {Promise<*>}
   */
  config({ name }, { accountUuid }, { dataSources }) {
    return dataSources.TradingEngineAPI.getSymbolConfig(accountUuid, name);
  },
};
