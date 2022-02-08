module.exports = {
  symbols(_, { args }, { dataSources }) {
    return dataSources.TradingEngineAdminAPI.getSymbols(args);
  },
};
