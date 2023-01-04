module.exports = {
  /**
   * Add Ip to Whitelist
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async add(_, args, { dataSources }) {
    await dataSources.BrandConfigAPI.ipWhitelistAdd(args);
    return true;
  },

  /**
   * Delete Ip from Whitelist
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async delete(_, args, { dataSources }) {
    await dataSources.BrandConfigAPI.ipWhitelistDelete(args);
    return true;
  },

  /**
   * Delete Ip from Whitelist
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async deleteMany(_, args, { dataSources }) {
    await dataSources.BrandConfigAPI.ipWhitelistDeleteMany(args);
    return true;
  },

  /**
   * Update Ip address description
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async edit(_, args, { dataSources }) {
    await dataSources.BrandConfigAPI.ipWhitelistUpdate(args);
    return true;
  },
};
