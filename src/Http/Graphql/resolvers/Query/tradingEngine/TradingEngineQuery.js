module.exports = {
  symbols(_, { args }, { dataSources }) {
    return dataSources.TradingEngineAdminAPI.getSymbols(args);
  },

  groups(_, { args }, { dataSources }) {
    return dataSources.TradingEngineAdminAPI.getGroups(args);
  },
};
