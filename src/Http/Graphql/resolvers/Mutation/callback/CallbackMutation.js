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
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  update(_, args, { dataSources }) {
    return dataSources.CallbackAPI.updateCallback(args);
  },
};
