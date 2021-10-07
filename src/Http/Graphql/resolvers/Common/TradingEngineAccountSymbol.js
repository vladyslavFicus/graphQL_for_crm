module.exports = {
  async groupSpread({ name }, { group, identifier }, { dataSources }) {
    let _group = group;

    // Find group by account identifier
    if (identifier) {
      const account = await dataSources.TradingEngineAPI.getAccountByIdentifier(identifier);
      _group = account.group;
    }

    return dataSources.TradingEngineAPI.getGroupSpread(_group, name);
  },
};
