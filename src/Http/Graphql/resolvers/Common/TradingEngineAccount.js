module.exports = {
  _id({ uuid }) {
    return uuid;
  },
  allowedSymbols({ uuid }, _, { dataSources }) {
    return dataSources.TradingEngineAPI.getAllowedAccountSymbols(uuid);
  },
};
