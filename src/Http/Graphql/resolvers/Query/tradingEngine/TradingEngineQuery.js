module.exports = {
  symbols(_, { args }, { dataSources }) {
    return dataSources.TradingEngineAdminAPI.getSymbols(args);
  },
  symbolsSources(_, __, { dataSources }) {
    return dataSources.TradingEngineAdminAPI.getSymbolsSources();
  },
  symbol(_, { symbolName }, { dataSources }) {
    return dataSources.TradingEngineAdminAPI.getSymbol(symbolName);
  },
  securities(_, __, { dataSources }) {
    return dataSources.TradingEngineAdminAPI.getSecurities();
  },
  security(_, { securityName }, { dataSources }) {
    return dataSources.TradingEngineAdminAPI.getSecurity(securityName);
  },
  orders(_, { args }, { dataSources }) {
    return dataSources.TradingEngineAPI.getOrders(args);
  },
};
