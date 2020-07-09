const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class FilterSetsAPI extends RESTDataSource {
  /**
   * Get filter sets by user id
   *
   * @param userId
   * @param type (CLIENT || PAYMENT || LEAD )
   *
   * @return {Promise}
   */
  getFilterSets(userId, type) {
    return this.get(`/user/${userId}/type/${type}`);
  }

  /**
   * Get filter set
   *
   * @param uuid
   *
   * @return {Promise}
   */
  getFilterSet(uuid) {
    return this.get(`/${uuid}`);
  }

  /**
   * Create filter set
   *
   * @param args
   *
   * @return {Promise}
   */
  createFilterSet(args) {
    return this.post('/', args);
  }

  /**
   * Update filter set
   *
   * @param uuid
   * @param args
   *
   * @return {Promise}
   */
  updateFilterSet(uuid, args) {
    return this.put(`/${uuid}`, args);
  }

  /**
   * Delete filter set
   *
   * @param uuid
   *
   * @return {Promise}
   */
  deleteFilterSet(uuid) {
    return this.delete(`/${uuid}`);
  }

  /**
   * Update filter set favorite mark
   *
   * @param uuid
   * @param favourite
   *
   * @return {Promise}
   */
  updateFilterFavorite(uuid, favourite) {
    return this.put(`/${uuid}/favourite/${favourite}`);
  }
}

module.exports = FilterSetsAPI;
