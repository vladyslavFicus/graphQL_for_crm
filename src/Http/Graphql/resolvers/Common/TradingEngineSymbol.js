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

  /**
   * Get current holiday for symbol
   *
   * @param symbol
   * @param _
   * @param dataSources
   *
   * @return {Promise<*>}
   */
  currentHolidays({ symbol }, _, { dataSources }) {
    return dataSources.TradingEngineAPI.getSymbolCurrentHolidays(symbol);
  },

  /**
  * Get source symbol entity
  *
  * @param symbol
  * @param _
  * @param dataSources
  *
  * @return {Promise<*>}
  */
  sourceSymbol({ source }, _, { dataSources }) {
    if (!source) {
      return null;
    }

    return dataSources.TradingEngineAPI.getSymbol(source);
  },
};
