module.exports = {
  /**
   * Create GridConfig set
   *
   * @param _
   * @param args
   * @param dataSources
   * @param userUUID
   *
   * @return {Promise}
   */
  create(_, args, { dataSources, userUUID }) {
    return dataSources.OperatorConfigAPI.createGridConfig({ ...args, userId: userUUID });
  },

  /**
   * Update GridConfig set
   *
   * @param _
   * @param uuid
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async update(_, { uuid, ...args }, { dataSources }) {
    await dataSources.OperatorConfigAPI.updateGridConfig(uuid, args);
  },

  /**
   * Delete GridConfig set
   *
   * @param _
   * @param uuid
   * @param dataSources
   *
   * @return {Promise}
   */
  async delete(_, { uuid }, { dataSources }) {
    await dataSources.OperatorConfigAPI.deleteGridConfig(uuid);
  },

};
