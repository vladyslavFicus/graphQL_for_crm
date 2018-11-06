const fetch = require('../../../../utils/fetch');
const buildQueryString = require('../../../../utils/buildQueryString');
const parseJson = require('../../../../utils/parseJson');

function getGames(_, { brandId, limit, offset, ...args }) {
  const queryString = buildQueryString({
    ...args,
    brandId,
    _limit: limit,
    _start: offset,
  });

  return fetch(`${global.appConfig.cmsUrl}/game?${queryString}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(content => ({ offset, content }));
}

module.exports = {
  getGames,
};
