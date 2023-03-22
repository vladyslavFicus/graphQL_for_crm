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

  async ipWhitelistDeleteMany(args) {
    const {
      uuids,
      bulkSize,
      searchParams,
      sorts,
    } = args;

    let newUuids = uuids;

    if (bulkSize) {
      const { content = [] } = await this.ipWhitelistSearch({
        ...(searchParams && searchParams),
        page: {
          from: 0,
          size: bulkSize + uuids.length,
          ...(sorts && sorts),
        },
      });

      newUuids = content
        .map(({ uuid }) => uuid)
        .filter(item => !uuids.includes(item));
    }

    return this.delete('/whitelist', {
      uuids: newUuids,
    });
  }

  ipWhitelistUpdate(args) {
    return this.put(`/whitelist/${args.uuid}`, args);
  }
}

module.exports = BrandConfigAPI;
