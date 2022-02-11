const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class Analytics extends RESTDataSource {
  getCallHistory(uuid, filters) {
    return this.post('/call-history/search', { uuid, ...filters });
  }
}

module.exports = Analytics;
