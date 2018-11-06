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
    .then(
      ({ number, totalElements, size, content, last }) =>
        size
          ? {
              page: number,
              number,
              totalElements,
              size,
              content,
              last,
            }
          : { error: 'Bad request' }
    );
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
  const activities = await getTradingActivitiesQuery(
    {
      ...args,
      loginIds: playerUUID ? loginIds.map(({ login }) => login) : args.loginIds,
    },
    context.headers.authorization
  );

  if (activities.error) {
    return { error: activities };
  }

  return { data: activities };
};

module.exports = {
  getTradingActivities,
};
