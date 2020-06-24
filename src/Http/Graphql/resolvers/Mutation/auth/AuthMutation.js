const { get } = require('lodash');
const { AuthenticationError } = require('@hrzn/apollo-datasource');

module.exports = {
  /**
   * Sign in
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise<SignIn>}
   */
  signIn(_, args, { dataSources }) {
    return dataSources.Auth2API.signIn(args);
  },

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
  async tokenRenew(_, __, { dataSources }) {
    try {
      return await dataSources.Auth2API.tokenRenew();
    } catch (error) {
      if (get(error, 'extensions.code') === 'error.entity.not.found') {
        throw new AuthenticationError('Token is not valid for refreshing');
      }
    }
    
    return null;
  },

  /**
   * Choose department
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise<ChooseDepartment>}
   */
  chooseDepartment(_, args, { dataSources }) {
    return dataSources.Auth2API.chooseDepartment(args);
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

  /**
   * Add authority
   *
   * @param _
   * @param uuid
   * @param args
   * @param dataSources
   * @param brand
   *
   * @return {Promise<{success: boolean}>}
   */
  async addAuthority(_, { uuid, ...args }, { dataSources, brand }) {
    await dataSources.Auth2API.addAuthority(uuid, { brand: brand.id, ...args });

    return { success: true };
  },

  /**
   * Remove authority
   *
   * @param _
   * @param uuid
   * @param args
   * @param dataSources
   * @param brand
   *
   * @return {Promise<{success: boolean}>}
   */
  async removeAuthority(_, { uuid, ...args }, { dataSources, brand }) {
    await dataSources.Auth2API.removeAuthority(uuid, { brand: brand.id, ...args });

    return { success: true };
  },
};
