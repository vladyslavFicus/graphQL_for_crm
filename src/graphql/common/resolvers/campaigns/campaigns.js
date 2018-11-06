const fetch = require('../../../../utils/fetch');
const parseJson = require('../../../../utils/parseJson');
const buildQueryString = require('../../../../utils/buildQueryString');
const { countryStrategies, statusesReasons } = require('../../../../constants/campaigns');

const mapCampaignArguments = args => {
  const params = {
    ...args,
    countries: {
      list: args.countries || [],
      strategy: args.excludeCountries ? countryStrategies.EXCLUDE : countryStrategies.INCLUDE,
    },
  };

  if (args.optInPeriod && args.optInPeriodTimeUnit) {
    params.optInPeriod = {
      duration: args.optInPeriod,
      timeUnit: args.optInPeriodTimeUnit,
    };
    delete params.optInPeriodTimeUnit;
  }

  if (args.fulfillmentPeriod && args.fulfillmentPeriodTimeUnit) {
    params.fulfillmentPeriod = {
      duration: args.fulfillmentPeriod,
      timeUnit: args.fulfillmentPeriodTimeUnit,
    };
    delete params.fulfillmentPeriodTimeUnit;
  }

  return params;
};

const getCampaigns = function(_, args, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/campaign/?${buildQueryString(args)}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response));
};

const getCampaign = function(_, { campaignUUID }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/campaign/${campaignUUID}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization,
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => (response.uuid ? { data: response } : { error: response }));
};

const updateCampaign = function(_, { uuid, ...args }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/campaign/${uuid}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(mapCampaignArguments(args)),
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => (response.uuid ? { data: response } : { error: response }));
};

const createCampaign = function(_, args, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/campaign/`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(mapCampaignArguments(args)),
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => (response.uuid ? { data: response } : { error: response }));
};

const activate = function(_, { campaignUUID }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/campaign/${campaignUUID}/activate`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => ({
      data: !response.error ? { ...response } : null,
      error: response.error || null,
    }));
};

const cancel = function(_, { campaignUUID, reasons }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/campaign/${campaignUUID}/cancel`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      reasons,
      stateReason: statusesReasons.CANCELED,
    }),
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => ({
      data: !response.error ? response : null,
      error: response.error || null,
    }));
};

const removeAllPlayers = function(_, { campaignUUID: uuid }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/campaign/${uuid}/player-list`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(({ campaignUUID, ...response }) => ({
      data: campaignUUID ? { uuid: campaignUUID, ...response } : null,
      error: response.error,
    }));
};

const fullResetCampaign = function(_, { campaignUUID }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/campaign/${campaignUUID}/full-reset-campaign`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => (response.uuid ? { data: response } : { error: response }));
};

const resetPlayer = function(_, { campaignUUID: uuid, playerUUID }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/campaign/${uuid}/reset-player-states/${playerUUID}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(({ campaignUUID, ...response }) => ({
      data: campaignUUID ? { uuid: campaignUUID, ...response } : null,
      error: response.error,
    }));
};

const clone = function(_, { uuid }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/campaign/${uuid}/clone`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => ({
      data: !response.error ? response : null,
      error: response.error || null,
    }));
};

module.exports = {
  getCampaigns,
  getCampaign,
  updateCampaign,
  createCampaign,
  activate,
  cancel,
  removeAllPlayers,
  fullResetCampaign,
  resetPlayer,
  clone,
};
