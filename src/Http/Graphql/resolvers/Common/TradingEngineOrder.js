module.exports = {
  account({ accountUuid }, _, { dataSources }) {
    return dataSources.TradingEngineAPI.getAccount(accountUuid);
  },
  symbolEntity({ symbol }, _, { dataSources }) {
    return dataSources.TradingEngineAPI.getSymbol(symbol);
  },
  async groupSpread({ accountUuid, symbol }, _, { dataSources }) {
    const { group } = await dataSources.TradingEngineAPI.getAccount(accountUuid);

    return dataSources.TradingEngineAPI.getGroupSpread(group, symbol);
  },
};
