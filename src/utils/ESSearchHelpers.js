const Logger = require('./logger');
const { ENTITY_NOT_FOUND, INTERNAL } = require('../constants/errors');
const { isEmpty } = require('lodash');

const parseToPageable = ({ hits: { total, hits } }, page, size) => ({
  totalElements: total,
  totalPages: total ? Math.ceil(total / size) : 0,
  content: hits.map(hit => ({ ...hit._source })),
  last: size >= total,
  number: page,
  page,
  size,
});

const getSearchData = (brandId, query, sort, { page = 0, size = 20 }, documentType) =>
  new Promise(resolve => {
    let filter = null;

    if (Array.isArray(query[query.length - 1]) && query[query.length - 1].length !== 0) {
      filter = query.splice(query.length - 1, 1)[0];
    }

    const filteredQuery = query.filter(item => !isEmpty(item));
    global.appClients.esClient.search(
      {
        index: `${brandId}_player`,
        type: documentType,
        body: {
          query: {
            bool: {
              ...(filteredQuery.length !== 0 && { must: filteredQuery }),
              ...(filter && { filter }),
            },
          },
          ...(sort && { sort }),
          size,
          from: page * size,
        },
      },
      (error, response) => {
        if (error) {
          Logger.error('Elastic Search query error', { error });
          return resolve({ error: error.statusCode === 404 ? ENTITY_NOT_FOUND : INTERNAL });
        }

        return resolve(response);
      }
    );
  });

module.exports = {
  parseToPageable,
  getSearchData,
};
