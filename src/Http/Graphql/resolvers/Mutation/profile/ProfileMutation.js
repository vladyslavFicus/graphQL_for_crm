module.exports = {
  /**
   * Create new client
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise<*>}
   */
  createProfile(_, { args }, { dataSources }) {
    return dataSources.ProfileAPI.createProfile(args);
  },

  /**
   * Change status profile (block/unblock)
   *
   * @param _
   * @param playerUUID
   * @param args
   * @param dataSources
   *
   * @return {*}
   */
  changeProfileStatus(_, { playerUUID, ...args }, { dataSources }) {
    return dataSources.ProfileAPI.changeStatus(playerUUID, args);
  },

  /**
   * Update profile information
   *
   * @param _
   * @param playerUUID
   * @param args
   * @param dataSources
   *
   * @return {*}
   */
  updatePersonalInformation(_, { playerUUID, ...args }, { dataSources }) {
    return dataSources.ProfileAPI.updatePersonalInformation(playerUUID, args);
  },

  /**
   * Update profile address
   *
   * @param _
   * @param playerUUID
   * @param args
   * @param dataSources
   *
   * @return {*}
   */
  async updateAddress(_, { playerUUID, ...args }, { dataSources }) {
    await dataSources.ProfileAPI.updateAddress(playerUUID, args);

    return dataSources.ProfileAPI.getByUUID(playerUUID);
  },

  /**
   * Update profile contacts
   *
   * @param _
   * @param playerUUID
   * @param args
   * @param dataSources
   *
   * @return {*}
   */
  async updateContacts(_, { playerUUID, ...args }, { dataSources }) {
    await dataSources.ProfileAPI.updateContacts(playerUUID, args);

    return dataSources.ProfileAPI.getByUUID(playerUUID);
  },

  /**
   * Update profile configuration
   *
   * @param _
   * @param playerUUID
   * @param args
   * @param dataSources
   *
   * @return {*}
   */
  async updateConfiguration(_, { playerUUID, ...args }, { dataSources }) {
    await dataSources.ProfileAPI.updateConfiguration(playerUUID, args);
  },

  /**
   * Update KYC status
   *
   * @param _
   * @param playerUUID
   * @param args
   * @param dataSources
   *
   * @return {*}
   */
  async updateKYCStatus(_, { playerUUID, ...args }, { dataSources }) {
    await dataSources.ProfileAPI.updateKYCStatus(playerUUID, args);
  },

  /**
   * Update client email
   *
   * @param _
   * @param playerUUID
   * @param email
   * @param dataSources
   *
   * @return {*}
   */
  async updateEmail(_, { playerUUID, email }, { dataSources }) {
    await dataSources.ProfileAPI.updateEmail(playerUUID, email);

    return dataSources.ProfileAPI.getByUUID(playerUUID);
  },

  /**
   * Verify client email
   *
   * @param _
   * @param playerUUID
   * @param dataSources
   *
   * @return {*}
   */
  verifyEmail(_, { playerUUID }, { dataSources }) {
    return dataSources.ProfileAPI.verifyEmail(playerUUID);
  },

  /**
   * Verify client phone
   *
   * @param _
   * @param playerUUID
   * @param phone
   * @param dataSources
   *
   * @return {*}
   */
  verifyPhone(_, { playerUUID, phone }, { dataSources }) {
    return dataSources.ProfileAPI.verifyPhone(playerUUID, phone);
  },
};
