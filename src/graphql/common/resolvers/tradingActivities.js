const { get } = require('lodash');
const fetch = require('../../../utils/fetch');
const buildQueryString = require('../../../utils/buildQueryString');
const { getProfile } = require('./profile');

const getTradingActivitiesQuery = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_activity/?${buildQueryString(args, true)}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
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

  return getTradingActivitiesQuery(
    {
      ...args,
      loginIds: playerUUID ? loginIds.map(({ login }) => login) : args.loginIds,
    },
    context.headers.authorization
  );
};

module.exports = {
  getTradingActivities,
};
