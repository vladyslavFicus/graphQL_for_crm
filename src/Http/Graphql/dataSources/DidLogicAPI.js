const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class DidLogicAPI extends RESTDataSource {
  /**
   * Create call to DidLogic
   *
   * @param url DidLogic host url
   * @param number Client phone number
   * @param agent Operator SIP number
   * @param accountId Account ID. Must be used together with `crm`.
   * @param crm CRM Name.  Must be used together with `account_id`.
   *
   * @return {Promise}
   */
  createCall(url, number, agent, accountId, crm) {
    return this.post(url, {
      number,
      agent,
      account_id: accountId,
      crm,
    });
  }
}

module.exports = DidLogicAPI;
