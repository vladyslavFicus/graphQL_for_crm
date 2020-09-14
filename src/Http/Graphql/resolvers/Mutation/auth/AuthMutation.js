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
   * @return {Promise}
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
   * @return {Promise<{boolean}>}
   */
  async logout(_, __, { dataSources }) {
    await dataSources.Auth2API.logout();
  },

  /**
   * TokenRenew
   *
   * @param _
   * @param __
   * @param dataSources
   *
   * @return {Promise}
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
   * @return {Promise}
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
   * @return {Promise<{boolean}>}
   */
  async changePassword(_, { clientUuid, ...args }, { dataSources }) {
    await dataSources.Auth2API.changeClientPassword(clientUuid, args);
  },

  /**
   * Change operator password
   *
   * @param _
   * @param operatorUuid
   * @param args
   * @param dataSources
   *
   * @return {Promise<{boolean}>}
   */
  async changeOperatorPassword(_, { operatorUuid, ...args }, { dataSources }) {
    await dataSources.Auth2API.changeOperatorPassword(operatorUuid, args);
  },

  /**
   * Change operator password on password expire
   * (change password without token)
   *
   * @param _
   * @param uuid | OperatorUuid from errorParams
   * @param args
   * @param dataSources
   *
   * @return {Promise<{boolean}>}
   */
  async changeUnauthorizedPassword(_, { uuid, ...args }, { dataSources }) {
    await dataSources.Auth2API.changeUnauthorizedPassword(uuid, args);
  },

  /**
   * Reset user (client or operator) password
   *
   * @param _
   * @param uuid
   * @param dataSources
   *
   * @return {Promise<{boolean}>}
   */
  async resetUserPassword(_, { userUuid }, { dataSources }) {
    await dataSources.Auth2API.resetUserPassword(userUuid);
  },

  /**
   * Reset yourself password
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise<{boolean}>}
   */
  async resetPassword(_, args, { dataSources }) {
    await dataSources.Auth2API.resetPassword(args);
  },

  /**
   * Unlock user ability to sign in
   *
   * @param _
   * @param uuid
   * @param dataSources
   *
   * @return {Promise<{boolean}>}
   */
  async unlockLogin(_, { uuid }, { dataSources }) {
    await dataSources.Auth2API.unlockUser(uuid);
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
   * @return {Promise<{boolean}>}
   */
  async addAuthority(_, { uuid, ...args }, { dataSources, brand }) {
    await dataSources.Auth2API.addAuthority(uuid, { brand: brand.id, ...args });
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
   * @return {Promise<{boolean}>}
   */
  async removeAuthority(_, { uuid, ...args }, { dataSources, brand }) {
    await dataSources.Auth2API.removeAuthority(uuid, { brand: brand.id, ...args });
  },

  /**
   * Update authority actions
   *
   * @param _
   * @param department
   * @param role
   * @param actions
   * @param dataSources
   * @param brand
   *
   * @return {Promise<void>}
   */
  async updateAuthorityActions(_, { department, role, actions }, { dataSources, brand }) {
    await dataSources.Auth2API.updateAuthorityActions(brand.id, department, role, actions);
  },
};
