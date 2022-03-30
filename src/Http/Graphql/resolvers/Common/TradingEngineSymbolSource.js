module.exports = {
  /**
   * Get children for source symbol
   *
   * @param sourceName
   * @param _
   * @param dataSources
   *
   * @return {Promise}
   */
  children({ sourceName }, _, { dataSources }) {
    return dataSources.TradingEngineAPI.getSymbolChildren(sourceName);
  },
};
