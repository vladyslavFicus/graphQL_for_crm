const { omitBy, isNil } = require('lodash');

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
  group(_, { groupName }, { dataSources }) {
    return dataSources.TradingEngineAdminAPI.getGroup(groupName);
  },
  groups(_, { args }, { dataSources }) {
    return dataSources.TradingEngineAdminAPI.getGroups(args);
  },
  orders(_, { args }, { dataSources }) {
    return dataSources.TradingEngineAPI.getOrders(args);
  },
  order(_, { orderId }, { dataSources }) {
    return dataSources.TradingEngineAPI.getOrder(orderId);
  },
  account(_, { identifier }, { dataSources }) {
    return dataSources.TradingEngineAPI.getAccountByIdentifier(identifier);
  },
  accounts(_, { args }, { dataSources }) { // eslint-disable-line
    // Drop undefined and nullable values from object (because BE service throw Error if null will be sent)
    const params = omitBy(args, isNil); // eslint-disable-line

    return dataSources.TradingEngineAPI.getAccounts(params);
  },
  accountSymbols(_, { accountUuid }, { dataSources }) {
    return dataSources.TradingEngineAPI.getAllowedAccountSymbols(accountUuid);
  },
  accountStatistic(_, { accountUuid }, { dataSources }) {
    return dataSources.TradingEngineAPI.getAccountStatistic(accountUuid);
  },
  transactions(_, { args }, { dataSources }) {
    return dataSources.TradingEngineAPI.getTransactions(args);
  },
};
