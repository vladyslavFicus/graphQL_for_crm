module.exports = {
  /**
   * Create callback lead
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
   * Update callback lead
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
   * Create callback client
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
     * Update callback client
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
};
