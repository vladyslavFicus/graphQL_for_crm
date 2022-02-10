module.exports = {
  symbols(_, { args }, { dataSources }) {
    return dataSources.TradingEngineAdminAPI.getSymbols(args);
  },
  securities(_, __, { dataSources }) {
    return dataSources.TradingEngineAdminAPI.getSecurities();
  },
  security(_, { securityName }, { dataSources }) {
    return dataSources.TradingEngineAdminAPI.getSecurity(securityName);
  },
};
