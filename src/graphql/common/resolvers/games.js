const fetch = require('../../../utils/fetch');
const buildQueryString = require('../../../utils/buildQueryString');
const parseJson = require('../../../utils/parseJson');
const { parseNumbersRange, getRange } = require('../../../utils/parseNumbersRange');
const { head, last } = require('lodash');

const mapGames = ({ content, ...response }) => ({
  ...response,
  content: content.map(({ betLevel, coinSizes, lines, coins, ...game }) => ({
    coinSizes: coinSizes ? parseNumbersRange(coinSizes) : [1],
    betLevels: betLevel ? parseNumbersRange(betLevel) : [1],
    lines: lines ? parseNumbersRange(lines) : [],
    coinsMin: coins ? head(getRange(coins)) : 0,
    coinsMax: coins ? last(getRange(coins)) : 20,
    ...game,
  })),
});

const getGame = async (_, { internalGameId, ...args }, context) =>
  fetch(`${global.appConfig.apiUrl}/game_info/public/games/${internalGameId}?${buildQueryString(args)}`)
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => (response.internalGameId ? { data: response } : { error: response }));

const getGames = (obj, args, { headers: { authorization } }) => {
  return fetch(`${global.appConfig.apiUrl}/game_info/public/games?${buildQueryString(args)}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => mapGames(response));
};

const getGameProviders = (_, { brandId }) => {
  return fetch(`${global.appConfig.apiUrl}/game_info/public/available/providerIds?brandId=${brandId}`, {
    method: 'OPTIONS',
  })
    .then(response => response.text())
    .then(response => parseJson(response));
};

module.exports = {
  getGames,
  getGame,
  getGameProviders,
};
