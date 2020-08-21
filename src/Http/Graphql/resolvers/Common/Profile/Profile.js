module.exports = {
  _id({ uuid }) {
    return uuid;
  },
  profileView({ uuid }, _, { dataSources }) {
    return dataSources.ProfileViewAPI.getByUUID(uuid);
  },
  kycNote({ kyc: { uuid } }, _, { dataSources }) {
    return dataSources.NoteAPI.getNote(uuid);
  },
  tradingAccounts({ uuid }, _, { dataSources }) {
    return dataSources.TradingAccountAPI.getClientTradingAccounts({ profileUUID: uuid });
  },
  acquisition({ uuid }, _, { dataSources }) {
    return dataSources.HierarchyAPI.getUserAcquisition(uuid);
  },
};
