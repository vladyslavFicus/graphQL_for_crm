module.exports = {
  /**
   * Create filter set
   *
   * @param _
   * @param args
   * @param dataSources
   * @param userUUID
   *
   * @return {Promise}
   */
  create(_, args, { dataSources, userUUID }) {
    return dataSources.OperatorConfigAPI.createFilterSet({ ...args, userId: userUUID });
  },

  /**
   * Update filter set
   *
   * @param _
   * @param uuid
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async update(_, { uuid, ...args }, { dataSources }) {
    await dataSources.OperatorConfigAPI.updateFilterSet(uuid, args);
  },

  /**
   * Delete filter set
   *
   * @param _
   * @param uuid
   * @param dataSources
   *
   * @return {Promise}
   */
  async delete(_, { uuid }, { dataSources }) {
    await dataSources.OperatorConfigAPI.deleteFilterSet(uuid);
  },

  /**
   * Update filter set favorite mark
   *
   * @param _
   * @param uuid
   * @param favourite
   * @param dataSources
   *
   * @return {Promise}
   */
  async updateFavourite(_, { uuid, favourite }, { dataSources }) {
    await dataSources.OperatorConfigAPI.updateFilterFavorite(uuid, favourite);
  },
};
