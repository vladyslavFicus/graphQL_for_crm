module.exports = {
  /**
   * Create lead callback
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  createLeadCallback(_, args, { dataSources }) {
    return dataSources.CallbackAPI.createLeadCallback(args);
  },

  /**
   * Update lead callback
   *
   * @param _
   * @param callbackId
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  updateLeadCallback(_, { callbackId, ...args }, { dataSources }) {
    return dataSources.CallbackAPI.updateLeadCallback(callbackId, args);
  },

  /**
   * Delete lead callback
   *
   * @param _
   * @param callbackId
   *
   * @return {Promise}
   */
  async deleteLeadCallback(_, { callbackId }, { dataSources }) {
    await dataSources.CallbackAPI.deleteLeadCallback(callbackId);
  },

  /**
   * Create client callback
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  createClientCallback(_, args, { dataSources }) {
    return dataSources.CallbackAPI.createClientCallback(args);
  },
  
  /**
   * Update client callback
   *
   * @param _
   * @param callbackId
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  updateClientCallback(_, { callbackId, ...args }, { dataSources }) {
    return dataSources.CallbackAPI.updateClientCallback(callbackId, args);
  },

  /**
   * Delete client callback
   *
   * @param _
   * @param callbackId
   *
   * @return {Promise}
   */
  async deleteClientCallback(_, { callbackId }, { dataSources }) {
    await dataSources.CallbackAPI.deleteClientCallback(callbackId);
  },
};
