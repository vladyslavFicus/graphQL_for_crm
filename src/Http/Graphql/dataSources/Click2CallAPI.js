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
   * Create call to Newtel
   *
   * @return {Promise}
   */
  createCallNewtel(args) {
    return this.post('/call/start/newtel', args);
  }

  /**
   * Create call to Squaretalk
   *
   * @return {Promise}
   */
  createCallSquaretalk(args) {
    return this.post('/call/start/squaretalk', args);
  }

  /**
   * Create call to Didlogic
   *
   * @return {Promise}
   */
  getCallHistory(uuid, filters) {
    return this.post('/call-history/search', { uuid, ...filters });
  }

  /**
   * Get call systems config
   *
   * @return {Promise}
   */
  getConfigs() {
    return this.post('/call/configs');
  }

  /**
   * Get call system config
   *
   * @return {Promise}
   */
  getConfigProvider(args) {
    return this.post('/call/config/provider', args);
  }
}

module.exports = Click2CallAPI;
