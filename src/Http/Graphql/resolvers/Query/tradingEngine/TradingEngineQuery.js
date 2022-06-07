const { omitBy, isNil } = require('lodash');

module.exports = {
  symbols(_, { args }, { dataSources }) {
    return dataSources.TradingEngineAPI.getSymbols(args);
  },
  symbolsSources(_, __, { dataSources }) {
    return dataSources.TradingEngineAPI.getSymbolsSources();
  },
  symbol(_, { symbolName }, { dataSources }) {
    return dataSources.TradingEngineAPI.getSymbol(symbolName);
  },
  securities(_, __, { dataSources }) {
    return dataSources.TradingEngineAPI.getSecurities();
  },
  security(_, { securityName }, { dataSources }) {
    return dataSources.TradingEngineAPI.getSecurity(securityName);
  },
  group(_, { groupName }, { dataSources }) {
    return dataSources.TradingEngineAPI.getGroupWithoutDataloader(groupName);
  },
  groups(_, { args }, { dataSources }) {
    return dataSources.TradingEngineAPI.getGroups(args);
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
  accountStatistic(_, { accountUuid }, { dataSources }) {
    return dataSources.TradingEngineAPI.getAccountStatistic(accountUuid);
  },
  transactions(_, { args }, { dataSources }) {
    return dataSources.TradingEngineAPI.getTransactions(args);
  },
  history(_, { args }, { dataSources }) {
    return dataSources.TradingEngineAPI.getHistory(args);
  },
  holidays(_, { args }, { dataSources }) {
    return dataSources.TradingEngineAPI.getHolidays(args);
  },
  holiday(_, { id }, { dataSources }) {
    return dataSources.TradingEngineAPI.getHoliday(id);
  },
  operator(_, { uuid }, { dataSources }) {
    return dataSources.TradingEngineAPI.getOperator(uuid);
  },
  operators(_, { args }, { dataSources }) {
    return dataSources.TradingEngineAPI.getOperators(args);
  },
  operatorAccessData(_, __, { dataSources }) {
    return dataSources.TradingEngineAPI.getOperatorAccess();
  },
};
