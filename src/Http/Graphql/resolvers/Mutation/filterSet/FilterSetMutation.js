module.exports = {
  /**
   * Create filter set
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise<FilterSet__Option|*>}
   */
  create(_, args, { dataSources, userUUID }) {
    return dataSources.FilterSetsAPI.createFilterSet({ ...args, userId: userUUID });
  },

  /**
   * Update filter set
   *
   * @param _
   * @param uuid
   * @param args
   * @param dataSources
   *
   * @return {Promise<success|*>}
   */
  async update(_, { uuid, ...args }, { dataSources }) {
    const responseData = await dataSources.FilterSetsAPI.updateFilterSet(uuid, args);
    return { success: !!responseData };
  },

  /**
   * Delete filter set
   *
   * @param _
   * @param uuid
   * @param dataSources
   *
   * @return {Promise<success|*>}
   */
  async delete(_, { uuid }, { dataSources }) {
    const responseData = dataSources.FilterSetsAPI.deleteFilterSet(uuid);
    return { success: !!responseData };
  },

  /**
   * Update filter set favorite mark
   *
   * @param uuid
   * @param favourite
   * @param dataSources
   *
   * @return {Promise<success|*>}
   */
  async updateFavourite(_, { uuid, favourite }, { dataSources }) {
    const responseData = await dataSources.FilterSetsAPI.updateFilterFavorite(uuid, favourite);
    return { success: !!responseData };
  },
};
