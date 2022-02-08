module.exports = {
  symbols(_, { args }, { dataSources }) {
    return dataSources.TradingEngineAPI.getSymbols(args);
  },
};
