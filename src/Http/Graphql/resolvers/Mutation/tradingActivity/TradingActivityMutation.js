module.exports = {
  /**
   * Change original agent
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise<*>}
   */
  async changeOriginalAgent(_, args, { dataSources }) {
    await dataSources.TradingActivityAPI.changeOriginalAgent(args);
    return true;
  },
};
