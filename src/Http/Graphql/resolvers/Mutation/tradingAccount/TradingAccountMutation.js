module.exports = {
  /**
   * Create trading account
   *
   * @param _
   * @param args
   *
   * @return {Promise<Boolean|*>}
   */
  async create(_, args, { dataSources }) {
    const { address, contacts } = await dataSources.ProfileAPI.getByUUID(args.profileId);

    await dataSources.TradingAccountAPI.createTradingAccount({
      ...args,
      address: address.address,
      city: address.city,
      country: address.countryCode,
      state: address.state,
      zipCode: address.zipCode,
      email: contacts.email,
      phone: contacts.phone,
    });
  },

  /**
   * Update name of trading account
   *
   * @param _
   * @param args
   *
   * @return {Promise<Boolean|*>}
   */
  async rename(_, args, { dataSources }) {
    await dataSources.TradingAccountAPI.renameTradingAccount(args.accountUUID, args);
  },

  /**
   * Disabling or enabling trading account
   *
   * @param _
   * @param args
   *
   * @return {Promise<Boolean|*>}
   */
  async toggleDisabled(_, args, { dataSources }) {
    await dataSources.TradingAccountAPI.toggleDisabledTradingAccount(args.accountUUID, args);
  },

  /**
   * Unarchive trading account
   *
   * @param _
   * @param args
   *
   * @return {Promise<Boolean|*>}
   */
  async unarchive(_, { uuid }, { dataSources }) {
    await dataSources.TradingAccountAPI.unarchiveTradingAccount(uuid);
  },

  /**
   * Change trading account's password
   *
   * @param _
   * @param args
   *
   * @return {Promise<Boolean|*>}
   */
  async changePassword(_, args, { dataSources }) {
    await dataSources.TradingAccountAPI.changeTradingAccountPassword(args.accountUUID, args);
  },

  /**
   * Change trading account's password
   *
   * @param _
   * @param args
   *
   * @return {Promise<Boolean|*>}
   */
  async changeLeverage(_, args, { dataSources }) {
    await dataSources.TradingAccountAPI.changeLeverage(args.accountUUID, args);
  },

  /**
   * Change trading account's password
   *
   * @param _
   * @param args
   *
   * @return {Promise<Boolean|*>}
   */
  async approveChangingLeverage(_, { accountUUID }, { dataSources }) {
    await dataSources.TradingAccountAPI.approveChangingLeverage(accountUUID);
  },

  /**
   * Change trading account's password
   *
   * @param _
   * @param args
   *
   * @return {Promise<Boolean|*>}
   */
  async rejectChangingLeverage(_, { accountUUID }, { dataSources }) {
    await dataSources.TradingAccountAPI.rejectChangingLeverage(accountUUID);
  },
};
