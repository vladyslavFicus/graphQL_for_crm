const config = require('config');

const getSocialTradingToken = () => {
  return fetch(`${config.get('brokeree.cabinetUrl')}/api/auth`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      role: 'Admin',
      login: config.get('brokeree.managerLogin'),
      apiKey: config.get('brokeree.apiKey'),
    }),
  }).then(response => response.json());
};

const getSocialTradingSubscribers = (id, token) => {
  return fetch(`${config.get('brokeree.cabinetUrl')}/api/subscribers/${id}/subscriptions?api_key=${token}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getSocialTradingProviders = (id, token) => {
  return fetch(`${config.get('brokeree.cabinetUrl')}/api/sources/${id}?api_key=${token}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getSocialTradingSubscribersOnProviders = (id, token) => {
  return fetch(`${config.get('brokeree.cabinetUrl')}/api/sources/${id}/subscriptions?api_key=${token}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

module.exports = {
  getSocialTradingToken,
  getSocialTradingSubscribers,
  getSocialTradingProviders,
  getSocialTradingSubscribersOnProviders,
};
