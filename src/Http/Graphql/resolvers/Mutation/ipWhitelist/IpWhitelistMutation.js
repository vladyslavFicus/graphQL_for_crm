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
    return dataSources.BrandConfigAPI.ipWhitelistAdd(args);
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
    dataSources.BrandConfigAPI.ipWhitelistDeleteMany(args);
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
  edit(_, args, { dataSources }) {
    return dataSources.BrandConfigAPI.ipWhitelistUpdate(args);
  },
};
