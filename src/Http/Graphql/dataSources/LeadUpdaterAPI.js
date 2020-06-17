const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class LeadUpdaterAPI extends RESTDataSource {
  /**
   * Update lead
   *
   * @param uuid | leadUuid
   * @param args
   *
   * @return {Promise}
   */
  updateLead(uuid, args) {
    return this.put(`/lead/${uuid}`, args);
  }

  /**
   * Update lead sales agent and sales status assign
   *
   * @param args
   *
   * @return {Promise}
   */
  bulkLeadUpdate(args) {
    return this.put('/bulk/lead/sales-status', args);
  }
}

module.exports = LeadUpdaterAPI;
