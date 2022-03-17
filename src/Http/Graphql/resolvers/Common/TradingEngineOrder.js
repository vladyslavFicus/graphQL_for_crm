module.exports = {
  account({ accountUuid }, _, { dataSources }) {
    return dataSources.TradingEngineAPI.getAccount(accountUuid);
  },
  symbolConfig({ accountUuid, symbol }, _, { dataSources }) {
    return dataSources.TradingEngineAPI.getSymbolConfig(accountUuid, symbol);
  },
  symbolEntity({ symbol }, _, { dataSources }) {
    return dataSources.TradingEngineAPI.getSymbol(symbol);
  },
};
