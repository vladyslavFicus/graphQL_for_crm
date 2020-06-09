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
    await dataSources.FilterSetsAPI.updateFilterSet(uuid, args);
    return { success: true };
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
    await dataSources.FilterSetsAPI.deleteFilterSet(uuid);
    return { success: true };
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
    await dataSources.FilterSetsAPI.updateFilterFavorite('dasdads', favourite);
    return { success: true };
  },
};
