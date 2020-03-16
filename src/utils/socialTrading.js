const { get } = require('lodash');
const { platform } = require('../config/core');

const API_KEY = get(platform, 'brokeree.api_key') || '';
const BASE_URL = get(platform, 'brokeree.cabinet_url') || '';
const DEFAULT_ADMIN_LOGIN = 399;

const getSocialTradingToken = () => {
  return fetch(`${BASE_URL}/api/auth`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      role: 'Admin',
      login: DEFAULT_ADMIN_LOGIN,
      apiKey: API_KEY,
    }),
  }).then(response => response.json());
};

const getSocialTradingSubscribers = (id, token) => {
  return fetch(`${BASE_URL}/api/subscribers/${id}/subscriptions?api_key=${token}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getSocialTradingProviders = (id, token) => {
  return fetch(`${BASE_URL}/api/sources/${id}?api_key=${token}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getSocialTradingSubscribersOnProviders = (id, token) => {
  return fetch(`${BASE_URL}/api/sources/${id}/subscriptions?api_key=${token}`, {
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
