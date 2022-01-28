const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class OperatorConfigAPI extends RESTDataSource {
  /**
   * Get filter sets by user id
   *
   * @param userId
   * @param type (CLIENT || PAYMENT || LEAD )
   *
   * @return {Promise}
   */
  getFilterSets(userId, type) {
    return this.get(`/filter/user/${userId}/type/${type}`);
  }

  /**
   * Get filter set
   *
   * @param uuid
   *
   * @return {Promise}
   */
  getFilterSet(uuid) {
    return this.get(`/filter/${uuid}`);
  }

  /**
   * Create filter set
   *
   * @param args
   *
   * @return {Promise}
   */
  createFilterSet(args) {
    return this.post('/filter/', args);
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
    return this.put(`/filter/${uuid}`, args);
  }

  /**
   * Delete filter set
   *
   * @param uuid
   *
   * @return {Promise}
   */
  deleteFilterSet(uuid) {
    return this.delete(`/filter/${uuid}`);
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
    return this.put(`/filter/${uuid}/favourite/${favourite}`);
  }

  /**
   * Get grid config
   *
   * @param uuid
   * @param type
   *
   * @return {Promise}
   */
  getGridConfig(userId, type) {
    return this.get(`/gridconfig/user/${userId}/type/${type}`);
  }

  /**
   * Create grid config
   *
   * @param uuid
   * @param type
   *
   * @return {Promise}
   */
  createGridConfig(args) {
    return this.post('/gridconfig/', args);
  }

  /**
   * Update grid config
   *
   * @param uuid
   * @param args
   *
   * @return {Promise}
   */
  updateGridConfig(uuid, args) {
    return this.put(`/gridconfig/${uuid}`, args);
  }

  /**
   * delete grid config
   *
   * @param uuid
   *
   * @return {Promise}
   */
  deleteGridConfig(uuid) {
    return this.delete(`/gridconfig/${uuid}`);
  }

}

module.exports = OperatorConfigAPI;
