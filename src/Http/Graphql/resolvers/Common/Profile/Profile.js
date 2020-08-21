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
  async acquisition({ uuid }, _, { dataSources }) {
    const response = await dataSources.HierarchyAPI.getUserAcquisition(uuid);

    if (response) {
      return response.acquisition;
    }

    return response;
  },
};
