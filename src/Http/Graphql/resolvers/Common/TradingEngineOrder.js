module.exports = {
  account({ accountUuid }, _, { dataSources }) {
    return dataSources.TradingEngineAPI.getAccount(accountUuid);
  },
  async symbolConfig({ accountUuid, symbol }, _, { dataSources }) {
    return dataSources.TradingEngineAPI.getSymbolConfig(accountUuid, symbol);
  },
};
