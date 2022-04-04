module.exports = {
  _id({ uuid }) {
    return uuid;
  },

  /**
   * Get account group entity
   *
   * @param group
   * @param _
   * @param dataSources
   *
   * @return {Promise}
   */
  groupEntity({ group }, _, { dataSources }) {
    return dataSources.TradingEngineAPI.getGroup(group);
  },
};
