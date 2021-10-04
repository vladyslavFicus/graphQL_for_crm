module.exports = {
  allowedSymbols({ uuid }, _, { dataSources }) {
    return dataSources.TradingEngineAPI.getAllowedAccountSymbols(uuid);
  },
};
