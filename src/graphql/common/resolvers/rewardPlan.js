const { get, omit } = require('lodash');
const fetch = require('../../../utils/fetch');
const { typesToUpdate } = require('../../../constants/rewardPlan');
const parseJson = require('../../../utils/parseJson');

const getDwhParam = key => get(global.appConfig.secrets.dwh_api, key, '');

const fetchActiveRewardPlan = function(_, { playerUUID }, { brand: { id } }) {
  return fetch(`${getDwhParam('url')}/user/${playerUUID}/rewards-wallet`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${getDwhParam('token')}`,
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
      BrandId: id,
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => {
      const { errorMessage, errorCode, active, balances } = response;

      if (errorMessage) {
        return { error: errorCode };
      }

      if (!active || !balances || active === 'NO_REWARDS' || balances[active] === null) {
        return { error: 'error.rewardPlan.active-not-found' };
      }

      return {
        data: {
          type: active,
          amount: balances[active],
        },
      };
    });
};

const fetchPendingRewardPlan = function(_, { playerUUID }, { brand: { id } }) {
  return fetch(`${getDwhParam('url')}/user/${playerUUID}/rewards-wallet`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${getDwhParam('token')}`,
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
      BrandId: id,
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => {
      const { errorMessage, errorCode, active, balances } = response;

      if (errorMessage) {
        return { error: errorCode };
      }

      const pendingRewards = omit(balances, active);

      const plans = Object.keys(pendingRewards).reduce((out, key) => {
        return [...out, { type: key, amount: pendingRewards[key] || 0 }];
      }, []);

      return { data: { plans } };
    });
};

const updateRewardPlan = function(_, { playerUUID, type, amount }, { brand: { id } }) {
  return fetch(`${getDwhParam('url')}/user/${playerUUID}/rewards-wallet`, {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${getDwhParam('token')}`,
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
      BrandId: id,
    },
    body: JSON.stringify({
      [typesToUpdate[type]]: amount,
    }),
  }).then(response =>
    response.status >= 200 && response.status < 300
      ? {
          data: {
            type,
            amount,
          },
          error: null,
        }
      : {
          data: null,
          error: 'error.rewardPlan.update',
        }
  );
};

module.exports = {
  fetchActiveRewardPlan,
  fetchPendingRewardPlan,
  updateRewardPlan,
};
