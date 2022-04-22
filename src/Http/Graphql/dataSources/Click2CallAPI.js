const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class Click2CallAPI extends RESTDataSource {
  /**
   * Create call to Commpeak
   *
   * @return {Promise}
   */
  createCallCommpeak(args) {
    return this.post('/call/start/commpeak', args);
  }

  /**
   * Create call to Coperato
   *
   * @return {Promise}
   */
  createCallCoperato(args) {
    return this.post('/call/start/coperato', args);
  }

  /**
   * Create call to Didlogic
   *
   * @return {Promise}
   */
  createCallDidlogic(args) {
    return this.post('/call/start/didlogic', args);
  }

  /**
   * Create call to Didlogic
   *
   * @return {Promise}
   */
  createCallAsterisk(args) {
    return this.post('/call/start/asterisk', args);
  }

  /**
   * Create call to Didlogic
   *
   * @return {Promise}
   */
  getCallHistory(uuid, filters) {
    return this.post('/call-history/search', { uuid, ...filters });
  }
}

module.exports = Click2CallAPI;
