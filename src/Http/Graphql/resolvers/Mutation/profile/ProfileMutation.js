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
};
