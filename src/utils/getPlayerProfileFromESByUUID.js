const { ENTITY_NOT_FOUND, INTERNAL } = require('../constants/errors');
const Logger = require('./logger');

const excludePlayerProfileKeys = ['@class', 'authorities', 'password', 'salt', 'token', 'tokenExpirationDate'];

function preparePlayerProfileResponse(source) {
  return Object.keys(source).reduce((res, key) => {
    if (excludePlayerProfileKeys.indexOf(key) === -1) {
      return res;
    }

    const nextRes = { ...res };

    delete nextRes[key];

    return nextRes;
  }, source);
}

module.exports = function(brandId, uuid) {
  if (!uuid) {
    return { error: ENTITY_NOT_FOUND };
  }

  return new Promise(resolve => {
    global.appClients.esClient.get({ index: `${brandId}_player`, type: 'profile', id: uuid }, function(
      error,
      response
    ) {
      if (error) {
        if (error.statusCode !== 404) {
          Logger.error({ message: error.stack, error });
        }

        return resolve({ error: error.statusCode === 404 ? ENTITY_NOT_FOUND : INTERNAL });
      }

      return resolve(preparePlayerProfileResponse(response._source));
    });
  });
};
