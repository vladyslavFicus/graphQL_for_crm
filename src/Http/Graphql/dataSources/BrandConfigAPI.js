const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class BrandConfigAPI extends RESTDataSource {
  /**
   * Get IP Whitelist
   *
   * @param args
   *
   * @return {Promise}
   */
  ipWhitelistSearch(args) {
    return this.post('/whitelist/search', args);
  }

  ipWhitelistAdd(args) {
    return this.post('/whitelist', args);
  }

  ipWhitelistDelete(args) {
    return this.delete(`/whitelist/${args.uuid}`);
  }

  ipWhitelistDeleteMany(args) {
    return this.delete('/whitelist', args);
  }

  ipWhitelistUpdate(args) {
    return this.put(`/whitelist/${args.uuid}`, args);
  }
}

module.exports = BrandConfigAPI;
