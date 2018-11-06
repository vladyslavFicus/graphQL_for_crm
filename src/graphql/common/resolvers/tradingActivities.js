const { get } = require('lodash');
const fetch = require('../../../utils/fetch');
const buildQueryString = require('../../../utils/buildQueryString');
const parseJson = require('../../../utils/parseJson');
const { getProfile } = require('./profile');

const getTradingActivitiesQuery = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_activity/?${buildQueryString(args, true)}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => response);
};

const getTradingActivities = async (_, { playerUUID, ...args }, context) => {
  let loginIds = null;

  if (playerUUID) {
    const player = await getProfile(_, { playerUUID }, context);

    if (player.error) {
      return { error: player };
    }
    loginIds = get(player, 'data.tradingProfile.mt4Users') || [];
  }
  const { number, totalElements, size, content, last } = await getTradingActivitiesQuery(
    {
      ...args,
      loginIds: playerUUID ? loginIds.map(({ login }) => login) : args.loginIds,
    },
    context.headers.authorization
  );

  if (!size) {
    return { error: { error: 'Bad request' } };
  }

  return { data: { number, totalElements, size, content, last } };
};

module.exports = {
  getTradingActivities,
};
