module.exports = {
  /**
   * Create callback
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  create(_, args, { dataSources }) {
    return dataSources.CallbackAPI.createCallback(args);
  },

  /**
   * Update callback
   *
   * @param _
   * @param callbackId
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  update(_, { callbackId, ...args }, { dataSources }) {
    return dataSources.CallbackAPI.updateCallback(callbackId, args);
  },
};
