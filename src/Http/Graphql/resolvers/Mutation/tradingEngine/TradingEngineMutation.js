module.exports = {
  /**
   * Create creditIn
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  createCreditIn(_, args, { dataSources }) {
    return dataSources.TradingEngineAPI.createCreditIn(args.accountUuid, args);
  },

  /**
   * Create creditOut
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  createCreditOut(_, args, { dataSources }) {
    return dataSources.TradingEngineAPI.createCreditOut(args.accountUuid, args);
  },
};
