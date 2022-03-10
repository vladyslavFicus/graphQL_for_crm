module.exports = {
  accessData(_, __, { dataSources }) {
    return dataSources.TradingEngineAPI.getOperatorAccess();
  },
};
