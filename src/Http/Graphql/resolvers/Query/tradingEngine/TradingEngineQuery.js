const { omitBy, isNil } = require('lodash');

module.exports = {
  symbols(_, { args }, { dataSources }) {
    return dataSources.TradingEngineAdminAPI.getSymbols(args);
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
  orders(_, { args }, { dataSources }) {
    return dataSources.TradingEngineAPI.getOrders(args);
  },
  accounts(_, { args }, { dataSources }) { // eslint-disable-line
    // Drop undefined and nullable values from object (because BE service throw Error if null will be sent)
    const params = omitBy(args, isNil); // eslint-disable-line

    return dataSources.TradingEngineAPI.getAccounts(params);
  },
};
