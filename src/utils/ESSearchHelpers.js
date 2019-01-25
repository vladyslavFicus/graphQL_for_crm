const { ENTITY_NOT_FOUND, INTERNAL } = require('../constants/errors');
const { isEmpty } = require('lodash');

const regexp = /([\+\-\=><!(){}[\]\^"~\*\?:\/\\]|&&|\|\|)/g;
const escapeESCharacters = str => str.replace(regexp, ch => `\\${ch}`);

const queryBuild = {
  ids: value =>
    value
      ? {
          ids: {
            values: value,
          },
        }
      : {},
  range: (searchField, { lt, gt, lte, gte }) =>
    lt || gt || lte || gte
      ? {
          range: {
            [`${searchField}`]: {
              ...(lt && { lt }),
              ...(gt && { gt }),
              ...(lte && { lte }),
              ...(gte && { gte }),
            },
          },
        }
      : {},
  match: (searchField, value) =>
    value
      ? {
          match: {
            [`${searchField}`]: Array.isArray(value) ? value.join(' ') : value,
          },
        }
      : {},
  should: (...query) => ({
    bool: {
      should: query.map(condition => ({
        bool: condition.reduce((acc, curr) => ({ ...acc, ...curr }), {}),
      })),
    },
  }),
  must: query => ({ must: query }),
  mustNot: query => ({ must_not: query }),
  exists: field => ({ exists: { field } }),
  bool: query => ({ bool: query }),
  queryString: (searchFields, value, config = {}) =>
    value
      ? {
          query_string: {
            query: `${config.prefix || ''}${escapeESCharacters(value)}${config.postfix || ''}`,
            fields: searchFields,
          },
        }
      : {},
  filter: value => value.filter(item => !isEmpty(item)),
};

const parseToPageable = ({ hits: { total, hits } }, page, size) => ({
  totalElements: total,
  totalPages: total ? Math.ceil(total / size) : 0,
  content: hits.map(hit => ({ ...hit._source })),
  last: size >= total,
  number: page,
  page,
  size,
});

const getScrollData = async (brandId, query, scroll, documentType, source = true) => {
  const initialQuery = await global.appClients.esClient.search({
    index: `${brandId}_player`,
    type: documentType,
    scroll,
    _source: source,
    body: {
      ...(query && {
        query: {
          bool: {
            must: query.filter(item => !isEmpty(item)),
          },
        },
      }),
      size: 1000,
    },
  });

  if (initialQuery.error) {
    return { error: initialQuery.error.statusCode === 404 ? ENTITY_NOT_FOUND : INTERNAL };
  }

  const responseQueue = [initialQuery];
  const results = [];

  while (responseQueue.length) {
    const response = responseQueue.shift();

    response.hits.hits.forEach(hit => {
      results.push(hit._source.registrationDate);
    });

    if (response.hits.total === results.length) {
      break;
    }

    const moreResults = await global.appClients.esClient.scroll({
      scrollId: response._scroll_id,
      scroll: scroll,
    });

    if (moreResults.error) {
      return { error: moreResults.error.statusCode === 404 ? ENTITY_NOT_FOUND : INTERNAL };
    }

    responseQueue.push(moreResults);
  }

  return {
    hits: results,
    total: initialQuery.hits.total,
  };
};

const getSearchData = (brandId, query, sort, { page = 0, size }, documentType) =>
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
          return resolve({ error: error.statusCode === 404 ? ENTITY_NOT_FOUND : INTERNAL });
        }

        return resolve(response);
      }
    );
  });

const getCountData = async (brandId, query, documentType) => {
  const count = await global.appClients.esClient.count({
    index: `${brandId}_player`,
    type: documentType,
    body: {
      ...(query && {
        query: {
          bool: {
            must: query.filter(item => !isEmpty(item)),
          },
        },
      }),
    },
  });

  if (count.error) {
    return { error: count.error.statusCode === 404 ? ENTITY_NOT_FOUND : INTERNAL };
  }

  return count;
};

module.exports = {
  queryBuild,
  parseToPageable,
  getScrollData,
  getSearchData,
  getCountData,
};
