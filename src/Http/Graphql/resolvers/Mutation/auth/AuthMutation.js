module.exports = {
  /**
   * Logout
   *
   * @param _
   * @param __
   * @param dataSources
   *
   * @return {Promise<{success: boolean}>}
   */
  async logout(_, __, { dataSources }) {
    await dataSources.Auth2API.logout();
    return { success: true };
  },

  /**
   * TokenRenew
   *
   * @param _
   * @param __
   * @param dataSources
   *
   * @return {Promise<TokenRenew>}
   */
  tokenRenew(_, __, { dataSources }) {
    return dataSources.Auth2API.tokenRenew();
  },

  /**
   * Change client password
   *
   * @param _
   * @param __
   * @param dataSources
   *
   * @return {Promise<{success: boolean}>}
   */
  async changePassword(_, { clientUuid, ...args }, { dataSources }) {
    await dataSources.Auth2API.changeClientPassword(clientUuid, args);
    return { success: true };
  },

  /**
   * Change operator password
   *
   * @param _
   * @param operatorUuid
   * @param args
   * @param dataSources
   *
   * @return {Promise<{success: boolean}>}
   */
  async changeOperatorPassword(_, { operatorUuid, ...args }, { dataSources }) {
    await dataSources.Auth2API.changeOperatorPassword(operatorUuid, args);
    return { success: true };
  },

  /**
   * Reset user (client or operator) password
   *
   * @param _
   * @param uuid
   * @param dataSources
   *
   * @return {Promise<{success: boolean}>}
   */
  async resetUserPassword(_, { userUuid }, { dataSources }) {
    await dataSources.Auth2API.resetUserPassword(userUuid);
    return { success: true };
  },

  /**
   * Reset yourself password
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise<{success: boolean}>}
   */
  async resetPassword(_, args, { dataSources }) {
    await dataSources.Auth2API.resetPassword(args);
    return { success: true };
  },

  /**
   * Unlock user ability to sign in
   *
   * @param _
   * @param uuid
   * @param dataSources
   *
   * @return {Promise<{success: boolean}>}
   */
  async unlockLogin(_, { uuid }, { dataSources }) {
    await dataSources.Auth2API.unlockUser(uuid);
    return { success: true };
  },
};
