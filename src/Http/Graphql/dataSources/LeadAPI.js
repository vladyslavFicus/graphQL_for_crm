const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class LeadAPI extends RESTDataSource {
  /**
   * Get leads
   *
   * @param args
   *
   * @return {Promise}
   */
  getLeads(args) {
    return this.post('/v2/leads/search', args);
  }

  /**
   * Get lead
   *
   * @param uuid | Lead
   *
   * @return {Promise}
   */
  getLead(uuid) {
    return this.get(`/lead/${uuid}`);
  }

  /**
   * Get leads total count
   *
   * @param args
   *
   * @return {Promise}
   */
  leadsTotalCount(args) {
    return this.post('/leads/count', args);
  }
}

module.exports = LeadAPI;
