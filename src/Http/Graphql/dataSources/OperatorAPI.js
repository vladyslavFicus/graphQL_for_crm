const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class OperatorAPI extends RESTDataSource {
  /**
   * Get operator by UUID
   *
   * @param uuid Operator UUID
   *
   * @return {Promise}
   */
  getOperatorByUUID(uuid) {
    return this.get(`/operator/operators/${uuid}`);
  }
}

module.exports = OperatorAPI;
