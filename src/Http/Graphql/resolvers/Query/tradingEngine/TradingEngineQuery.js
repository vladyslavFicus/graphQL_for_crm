module.exports = {
  symbols(_, { args }, { dataSources }) {
    return dataSources.TradingEngineAdminAPI.getSymbols(args);
  },
  groups(_, { args }, { dataSources }) {
    return dataSources.TradingEngineAdminAPI.getGroups(args);
  },
  symbol(_, { symbolName }, { dataSources }) {
    return dataSources.TradingEngineAdminAPI.getSymbol(symbolName);
  },
  symbolsSources(_, __, { dataSources }) {
    return dataSources.TradingEngineAdminAPI.getSymbolsSources();
  },
  securities(_, __, { dataSources }) {
    return dataSources.TradingEngineAdminAPI.getSecurities();
  },
  security(_, { securityName }, { dataSources }) {
    return dataSources.TradingEngineAdminAPI.getSecurity(securityName);
  },
  group(_, { groupName }, { dataSources }) {
    return dataSources.TradingEngineAdminAPI.getGroup(groupName);
  },
};
