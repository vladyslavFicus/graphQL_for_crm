const { get } = require('lodash');
const fetch = require('../../../utils/fetch');
const { getProfile } = require('./profile');

const getTradingActivitiesQuery = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading-activity/`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
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

const changeOriginalAgent = function(_, args, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/trading-activity/record`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ success: response.status === 200 }));
};

module.exports = {
  getTradingActivities,
  changeOriginalAgent,
};
